import { useEffect, useState, useRef, useCallback } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { TextField, Button, Stack } from '@mui/material';
import sharedCSSModule from '../../shared/css/shared.module.css';
import {Simulate} from "react-dom/test-utils";
import {auth} from "../../../../firebaseconfig";
import error = Simulate.error;

export default function SecurityQuestionForm() {
    const location = useLocation();
    const { claim, email, token, uid } = location.state || {}; // Add a default empty object if location.state is null

    const [secQuestion, setSecQuestion] = useState('');
    const [loading, setLoading] = useState(true);
    const securityQuestionAnswerRef = useRef(null);
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();
    const [response, setResponse] = useState({
        claim: '',
        email: '',
        token: '',
        uid: '',
    });

    const formHandler = useCallback(
        async (event) => {
            event.preventDefault();

            const data = {
                uid: uid, // Use the uid from the location state
                question: secQuestion, // Use the fetched security question
                answer: securityQuestionAnswerRef.current?.value,
            };

            try {
                const response = await fetch('https://login-kku3a2biga-uc.a.run.app/checkanswer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const responseData = await response.json();
                if (response.ok) {
                    setResponse({
                        claim: claim,
                        email: email,
                        token: token,
                        uid: uid,
                    });
                    if (claim === 'admin') {
                        navigate('/home/admin', {
                            state: {
                                claim: claim,
                                email: email,
                                token: token,
                                uid: uid,
                            },
                        });
                    }
                    else {
                        if(auth.currentUser) {
                            let idtoken = await auth.currentUser.getIdToken(true);
                            const response = await fetch('https://6418qzn2i7.execute-api.us-east-1.amazonaws.com/dev/app/team', {
                                method: 'GET',
                                headers: {
                                    'authorizationToken': idtoken,
                                }
                            });
                            console.log(response);
                        }
                        const responseData = await response.json();
                        console.log("Response: "+ responseData.team);
                        if (responseData.teamData && responseData.teamData.length > 0) {
                            localStorage.setItem('team', responseData.team);
                            navigate('/home/team')
                        }
                        navigate('/home', {
                            state: {
                                claim: claim,
                                email: email,
                                token: token,
                                uid: uid,
                            },
                        });
                    }
                }
                 else {
                    setResponseMessage('Answer is incorrect.');
                }
            } catch (error) {
                console.error('Error occurred while making the API call:', error);
            }
        },
        [secQuestion, uid]
    );

    useEffect(() => {
        async function fetchSecurityQuestion() {
            if (!uid) {
                // Handle the case when uid is not available (location.state is null)
                console.error('No uid available in location state.');
                setLoading(false);
                return;
            }

            const data = {
                uid: uid, // Use the uid from the location state
            };

            try {
                const response = await fetch('https://login-kku3a2biga-uc.a.run.app/get/question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const responseData = await response.json();
                if (response.ok) {
                    setSecQuestion(responseData.response);
                    setLoading(false);
                } else {
                    // Handle error scenario if needed
                    console.error('Error occurred while fetching the security question.');
                }
            } catch (error) {
                console.error('Error occurred while making the API call:', error);
            }
        }

        fetchSecurityQuestion();
    }, [uid]); // Add uid as a dependency to the useEffect hook

    if (loading) {
        return <div>Loading...</div>; // You can show a loading indicator while waiting for the API response
    }

    return (
        <>
            <form onSubmit={formHandler} className={sharedCSSModule.login_form}>
                <Stack spacing={1}>
                    <TextField disabled value={secQuestion} fullWidth label="Security Question" id="sec_q" name="sec_q" />
                    <TextField inputRef={securityQuestionAnswerRef} fullWidth label="Security Question Answer" id="sec_q_ans" name="sec_q_ans" type="password" />
                    <Button sx={{ mb: 2, py: 1 }} type="submit" variant="contained">
                        Submit
                    </Button>
                </Stack>
            </form>
        </>
    );
}
