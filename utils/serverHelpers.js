import { backendUrl } from "./config";

export const makeUnauthenticatePOSTRequest = async (route, body) => {
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    console.log(response);
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeauthenticatedPOSTRequest = async (route, body) => {
    try {
        const token = getToken();
        console.log("Token:", token); 
        if (!token) throw new Error("Token not found");

        const response = await fetch(backendUrl + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            // Extract error message if provided by the backend
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in makeauthenticatedPOSTRequest:", error);
        throw error;
    }
};

const getToken = () => {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return accessToken;
};

export const makeauthenticatedGETRequest = async (route, body) => {
    try {
        const token = getToken();
        console.log("Token:", token); 
        if (!token) throw new Error("Token not found");

        const response = await fetch(backendUrl + route, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            // Extract error message if provided by the backend
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in makeAuthenticatedPOSTRequest:", error);
        // Re-throw error for caller to handle or return a default response
        throw error;
    }
};
