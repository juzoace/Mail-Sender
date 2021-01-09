export const handleAxiosError = (error) => {
	if (error.response) {
		switch (error.response.data.status) {
			case 400:
				return `Error, bad request: ${error.response.data.message}`;
			case 401:
				return `Unauthorized, login required: ${error.response.data.message}`;
			case 403:
				return `You don't have the permission to access this function: ${error.response.data.message}`;
			case 404:
				return `Sorry Page Not Found: ${error.response.data.message}`;
			case 500:
				return `Sorry there was an error: ${error.response.data.message}`;
			default:
				return `Sorry there was an error: ${error.response.data.message}`;
		}
	} else {
		return error;
	}
};
