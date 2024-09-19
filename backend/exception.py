class ValidationException(Exception):
    """Exception raised for validation errors at the service level"""
    pass


class BusinessLogicException(Exception):
    """Exception raised for business logic errors at the service level"""
    pass
