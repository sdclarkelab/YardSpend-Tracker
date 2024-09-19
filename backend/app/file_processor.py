import os

import chardet
from dotenv import load_dotenv
from fastapi import UploadFile
import pandas as pd
from io import BytesIO

from openai import OpenAI

load_dotenv()

# Get the API key from environment variables
# api_key = os.getenv('API_KEY')
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.getenv("API_KEY"),
)


def generate_text(merchant, model="text-davinci-003", max_tokens=150):
    prompt = (f"Categorize the following merchant into one of these categories: Food, Utility, Gas, Groceries, Other. "
              f"Respond only with the category name. 'DIGP -' and 'NWCJ -' should be assigned to Utility category."
              f"Merchant names with 'DIGICEL' should be assigned to Utility category."
              f"Merchant names with 'LOSHUSAN' should be assigned to Food category."
              f"Merchant names with 'JOHN R WONG' should be assigned to Food category. \n\nMerchant: '{merchant}' ")

    chat_completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        response_format={
            "type": "text"
        }
    )

    return chat_completion.choices[0].message.content


async def read_file(file: UploadFile) -> pd.DataFrame:
    content = await file.read()

    # Detect encoding
    result_encoding = chardet.detect(content)
    encoding = result_encoding['encoding']

    # Load the CSV content into DataFrame
    try:
        df = pd.read_csv(BytesIO(content), encoding=encoding, on_bad_lines='skip')
    except pd.errors.ParserError as e:
        raise ValueError(f"Error parsing CSV file: {e}")

    return df


async def process_file(df: pd.DataFrame):
    results = {}

    for i, row in df.iterrows():
        key = row.iloc[16]
        value = row.iloc[45]

        if not pd.isna(key):  # Column Q is at index 16
            cat = generate_text(key)
            if cat not in results.keys():
                results[cat] = {'total': float(0), 'merchants': []}
            if not pd.isna(value):  # Column AT is at index 46
                try:
                    float_value = float(value)
                    results[cat]['merchants'].append({'name': key, 'amount': float_value})

                    results[cat]['total'] = results[cat]['total'] + float_value
                except ValueError:
                    # Skip non-numeric values
                    continue

    return results
