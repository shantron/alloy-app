import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    nameFirst: "",
    nameLast: "",
    addressLine1: "",
    addressLine2: "",
    addressCity: "",
    addressState: "",
    addressPostalCode: "",
    addressCountryCode: "US",
    documentSsn: "",
    email: "",
    birthDate: "",
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");

  const isDateOfBirthBeforeToday = (birthDate) => {
        const now = new Date();
        const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];

        if (today > birthDate) {
            return true;
        }
        return false;
    };  
    
    const handleBirthDateBlur = (e) => {
        const { value } = e.target;
        const isBirthDateBeforeToday = isDateOfBirthBeforeToday(value);
        if (!isBirthDateBeforeToday) {
            setBirthDateErrorMessage('Birth date must be before today.');
            return;
        } else {
            setBirthDateErrorMessage("");
        }
    };

const isEmailValid = (email) => {
    // The current longest top level domain is 24 characters. 
    // See https://data.iana.org/TLD/tlds-alpha-by-domain.txt.
    // Set to 32 characters to allow for future expansion.
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,32}$/;
    return emailRegex.test(email);
};

const handleEmailBlur = (e) => {
    const { value } = e.target;
    const isValidEmail = isEmailValid(value);
    if (!isValidEmail) {
        setEmailErrorMessage('Please proide a valid email address.');
        return;
    } else {
        setEmailErrorMessage("");
    }
};

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const applicantData = {
      name_first: formData.nameFirst,
      name_last: formData.nameLast,
      address_line_1: formData.addressLine1,
      address_line_2: formData.addressLine2,
      address_city: formData.addressCity,
      address_state: formData.addressState,
      address_postal_code: formData.addressPostalCode,
      address_country_code: formData.addressCountryCode,
      document_ssn: formData.documentSsn,
      email_address: formData.email,
      birth_date: formData.birthDate,
    };

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicantData),
      });
      console.log('Applicant Data:', applicantData);
      console.log('API Response:', response);

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('JSON Response:', jsonResponse);

        // If the form data was incomplete or missing required fields, the response code from Alloy is 200
        if (jsonResponse.status_code === 200) {
            setErrorMessage('Unable to submit the application. Please refresh the page or contact support. You may need to provide additional information.',
            console.log(JSON.stringify( jsonResponse.required )),
            );
            return;
        }

        const outcome = jsonResponse.summary.outcome;
        if (outcome === "Approved") {
            navigate('/approved');
            } else if (outcome === "Denied") {
            navigate('/denied');
            } else if (outcome === "Manual Review") {
            navigate('/review');
            };
  
      } else {
        setErrorMessage(
         'Unable to submit the application. Please refresh the page or contact support.',
        );
      }
    } catch (error) {
        setErrorMessage( 'Error: ' + error.message );
    }
  };

  return (
    <div className="app-form">
      <h2>Get approved now!**</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameFirst">First Name:</label>
          <input
            type="text"
            id="nameFirst"
            name="nameFirst"
            value={formData.nameFirst}
            onChange={handleInputChange}
            placeholder="First Name*"
            required
          />
        </div>
        <div>
          <label htmlFor="nameLast">Last Name:</label>
          <input
            type="text"
            id="nameLast"
            name="nameLast"
            value={formData.nameLast}
            onChange={handleInputChange}
            placeholder="Last Name*"
            required
          />
        </div>
        <div>
          <label htmlFor="addressLine1">Street Address:</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            placeholder="Street Address*"
            required
          />
        </div>
        <div>
          <label htmlFor="addressLine2">Apartment, Suite, etc (optional):</label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            placeholder="Apartment, Suite, etc (optional)"
          />
        </div>
        <div>
          <label htmlFor="addressCity">City:</label>
          <input
            type="text"
            id="addressCity"
            name="addressCity"
            value={formData.addressCity}
            onChange={handleInputChange}
            required
            placeholder="City*"
          />
        </div>
        <div className="address-fields">
        <div className="address-state">
            <label htmlFor="addressState">State:</label>
            <select
                id="addressState"
                name="addressState"
                value={formData.addressState}
                onChange={handleInputChange}
                required
                style={{
                    padding: "8px",
                    paddingBottom: "10px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    width: "100%",
                  }}
            >
                <option value="">Select a state*</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
        </div>
        <div className="address-city">
          <label htmlFor="addressPostalCode">Zip Code:</label>
          <input
            type="text"
            id="addressPostalCode"
            name="addressPostalCode"
            value={formData.addressPostalCode}
            onChange={handleInputChange}
            placeholder="Zip Code*"
            required
          />
        </div>
        </div>
       
        <div>
            {/* TODO: Make this a country select field when more countries are supported */}
          <label htmlFor="addressCountryCode">Country:</label>
          <input
            type="text"
            id="addressCountryCode"
            name="addressCountryCode"
            defaultValue={formData.addressCountryCode}
            onChange={handleInputChange}
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="documentSsn">Social Security Number:</label>
          <input
            type="text"
            id="documentSsn"
            name="documentSsn"
            pattern='[0-9]*'
            minLength={9}
            maxLength={9}
            value={formData.documentSsn}
            onChange={handleInputChange}
            required
            placeholder="9 digits without dashes or spaces*"
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            placeholder="Email*"
            required
          />
          <div className="error-message">{emailErrorMessage}</div>
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            onBlur={handleBirthDateBlur}
            required
          />
          <div className="error-message">{birthDateErrorMessage}</div>
        </div>
        <div className="error-message">{errorMessage}</div>
        <div className="submit-button-container">
            <button type="submit">Submit</button>
        </div>
      </form>
        <p>
            ** Some applications may require additional time. This is a demo application.
        </p>
    </div>
  );
};

export default ApplicationForm;
