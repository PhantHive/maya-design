import React, { useState, useEffect } from 'react';
import '../styles/consent.css';

// Declare gtag on the window object
declare global {
    interface Window {
        gtag: (...args: (string | object)[]) => void;
        dataLayer: object[];
    }
}

const ConsentBanner: React.FC = () => {
    const [consentGiven, setConsentGiven] = useState(false);

    const giveConsent = () => {
        setConsentGiven(true);
        localStorage.setItem('cookieConsent', 'true');
        // Set the consent mode to granted
        window.gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
        });
    };

    useEffect(() => {
        if (localStorage.getItem('cookieConsent') === 'true') {
            setConsentGiven(true);
            window.gtag('consent', 'update', {
                ad_storage: 'granted',
                analytics_storage: 'granted',
            });
        } else {
            // Set the default consent state to denied
            window.gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
            });
        }
    }, []);

    if (consentGiven) {
        return null;
    }

    return (
        <div className="consent-banner">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="80"
                height="80"
            >
                <g className="fairy-body">
                    <path
                        d="M192.83 24.426c-14.71 1.688-27.402 8.33-38.143 17.437 21.23 13.037 42.044 30.898 61.172 49.701 11.727 11.528 22.782 23.42 32.816 34.805 2.442-4.263 4.944-8.626 7.532-13.092-4.309-38.254-34.612-87.21-63.377-88.851zM71.886 46.303c-28.61 18.45-40.203 39.995-42.605 63.398-.15 74.543 63.687 152.073 122.455 179.155-28.275 12.217-60.633 32.6-76.461 55.98-11.387 19.032-10.034 31.734 7.072 40.14 34.057 16.282 67.59 8.121 96.186-7.785-7.344-3.524-14.805-7.242-22.362-10.962 44.88-10.627 66.885-45.326 91.797-75.745.059-6.436.504-13.327 1.325-20.502a43.516 43.516 0 0 1-5.502 1.524c-6.904 9.334-14.834 17.74-24.063 24.5 2.14 10.716-3.044 22.63-12.478 30.2-12.624 10.126-31.187 11.141-41.143-1.268-9.956-12.41-4.94-30.31 7.684-40.438 10.637-8.535 25.492-10.597 35.861-3.607 3.691-2.802 7.176-5.973 10.478-9.44-19.17-5.932-51.374-15.938-56.818-34.84-1.342-4.912.81-12.057 5.219-15.408 37.102-28.196 54.783-52.147 70.605-78.478-10.657-12.265-22.785-25.439-35.896-38.327-32.68-30.98-92.798-81.056-131.354-58.097zm381.455 1.342L438.308 71.58l-27.53-6.406 18.12 21.693-14.598 24.201 26.229-10.527 18.508 21.361-1.908-28.199 26.035-10.998-27.409-6.9zM286.636 97.768c-31.881 49.744-43.506 88.443-104.685 135.77 13.843 12.594 33.702 21.043 51.474 21.064 8.487-.088 14.172-2.306 17.625-7.059 11.48-15.8 15.656-39.606 21.385-62.818 5.73-23.213 13.931-47.302 37.625-58.055 20.1-5.935 38.659 2.736 55.143 11.6 1.529-4.12 2.463-8.88 2.365-13.694-1.157-34.505-68.383-40.598-80.932-26.808zm139.784 22.289l-20.05 73.98c6.298-.42 12.578 1.362 17.339 4.834l20.084-74.107zM317.498 143.06c-14.519 6.588-20.98 21.077-26.16 40.449 3.481 7.099 8.888 12.376 15.466 14.648 15.531 5.364 35.634-6.645 43.217-30.035 1.783-5.5 2.636-10.925 2.711-16.08-9.606-5.248-25.954-13-35.234-8.982zm-31.526 63.002c-3.265 14.198-7.083 29.01-14.289 42.363-2.701 12.403-4.405 24.449-5.086 35.013 13.039 7.148 29.31 10.761 42.942 8.446 12.331-11.85 28.684-27.948 27.936-43.933-.553-8.697-5.006-20.166-7.471-33.02-17.208 4.562-31.691 2.43-44.032-8.87zm110.436 16.447c-2.267 7.933 1.41 14.15 6.047 15.29 4.637 1.141 11.153-2.568 13.42-10.501 2.267-7.934-1.412-14.152-6.05-15.293-6.508-.905-12.2 6.554-13.417 10.504zm-7.584 28.603c-3.453 9.805-7.315 19.06-14.48 28.305-6.839-6.749-12.912-14.547-18.268-22.84-1.097 7.625-4.754 14.066-8.518 19.486 9.168 11.889 17.428 19.544 28.23 28.495 14.257-13.76 24.77-32.23 30.587-48.825-6.38.516-12.674-1.153-17.551-4.62zm-203.77 47.426c-6.589 5.286-7.21 12.266-4.908 15.135 2.302 2.869 9.251 3.776 15.84-1.51s7.208-12.266 4.906-15.135c-4.943-4.1-11.831-1.63-15.838 1.51zm77.295 2.97c-14.904 18.19-31.895 45.95-63.98 65.055 41.127 18.595 78.3 29.021 104.463 28.729 5.59-28.393 8.762-56.945 1.767-84.805-15.255.425-29.374-2.567-42.25-8.978zm-42.006 93.89c-5.72 9.016-12.532 17.725-20.484 25.923-7.492-4.257-15.117-8.599-22.982-12.527l-8.043 16.103c5.532 2.764 11.165 6.01 16.927 9.397-18.288 15.027-41.164 27.595-69.029 36.078l5.242 17.22c32.565-9.913 59.247-25.254 80.239-43.76 22.665 10.31 42.29 18.374 63.117 17.056 13.743-12.908 22.215-31.465 27.238-47.662-5.966-.39-12.177-1.172-18.598-2.307-4.06 11.875-9.111 24.142-16.455 32.252-13.847-.06-27.48-5.597-41.437-12.895 8.378-9.091 15.57-18.736 21.595-28.718a386.01 386.01 0 0 1-17.33-6.16z"
                        fill="#FFFFFF"
                    />
                </g>
                <g className="fairy-wings-hair">
                    <path
                        d="M381.455 1.342L438.308 71.58l-27.53-6.406 18.12 21.693-14.598 24.201 26.229-10.527 18.508 21.361-1.908-28.199 26.035-10.998-27.409-6.9zM286.636 97.768c-31.881 49.744-43.506 88.443-104.685 135.77 13.843 12.594 33.702 21.043 51.474 21.064 8.487-.088 14.172-2.306 17.625-7.059 11.48-15.8 15.656-39.606 21.385-62.818 5.73-23.213 13.931-47.302 37.625-58.055 20.1-5.935 38.659 2.736 55.143 11.6 1.529-4.12 2.463-8.88 2.365-13.694-1.157-34.505-68.383-40.598-80.932-26.808z"
                        fill="#FFD700"
                    />
                </g>
                <g className="fairy-sparkle">
                    <circle cx="100" cy="100" r="4" fill="#FFFFFF">
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="150" cy="150" r="3" fill="#FFFFFF">
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="2s"
                            begin="0.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="200" cy="100" r="5" fill="#FFFFFF">
                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="2s"
                            begin="1s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>
            <div className="consent-text">
                <p>
                    This magical site uses cookies to enhance your experience!
                    ✨
                </p>
                <button onClick={giveConsent} className="consent-button">
                    Okay, got it!
                </button>
            </div>
        </div>
    );
};

export default ConsentBanner;
