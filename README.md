# Tick
Tick is a dynamic and user-centric concert ticketing website designed to elevate your live music encounters. As a reliable platform for securing tickets to the hottest concerts, Tick offers a range of key features tailored to ensure a seamless and engaging user experience.

## Key Features
1. **Microservices**  
Leveraging a microservices architecture, Tick’s backend is designed as a network of independent services, providing scalable and flexible functionalities. This design allows for optimized performance, streamlined maintenance, and the ability to adapt swiftly to evolving user demands.


2. **First Come First Serve Queue**  
Our platform implements a fair and transparent queue system, ensuring equal opportunities for all users to access highly sought-after concert tickets. By managing traffic flow and serving users based on arrival order, we ensure a smooth and equitable ticket purchasing process.


3. **Multi-Factor Authentication using AWS Cognito**  
Tick prioritizes user security by employing robust multi-factor authentication powered by AWS Cognito. This advanced authentication system safeguards user accounts and sensitive ticketing information, ensuring a secure and trustworthy environment for ticket purchases.


4. **Recommended Events based on artists of similar genres**  
Tick's recommendation engine leverages the cosine similarity of artist genres to provide personalized event suggestions. By analyzing the musical genres of artists, our algorithm identifies and recommends events with similar music styles, ensuring an experience that resonates with your music taste.

5. **reCAPTCHA Integration**  
In our commitment to maintaining platform integrity, we implement reCAPTCHA to distinguish human users from bots. This security measure shields against fraudulent activities, ensuring a secure and authentic ticket purchasing process.


## Visit our website at 
- Go to site settings and enable insecure content on Google Chrome

## Running the frontend folder locally
- add the keys required in aws-exports-prod.js to your environment
- note: the recaptcha sitekey is tied to the deployed frontend and a different sitekey is required for localhost
