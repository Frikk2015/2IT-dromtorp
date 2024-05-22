import { ticket } from "../../../frontend/app/lib/types";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useState } from "react";

import axios from "axios";

export default function TicketForm(): JSX.Element {
    const [contactInfo, setContactInfo] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [shortDes, setShortDes] = useState<string>("");
    const [longDes, setLongDes] = useState<string>("");

    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData: ticket = {
            fullName: fullName,
            contactInfo: contactInfo,
            shortDes: shortDes,
            longDes: longDes,
        };

        axios.post("/api/add-new-ticket", formData);
    };

    return (
        <>
            <form onSubmit={handlesubmit}>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required={true} type="text" placeholder="Your full name" />
                <Input
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    required={true}
                    type="email"
                    placeholder="Your email address"
                />
                <Input
                    value={shortDes}
                    onChange={(e) => setShortDes(e.target.value)}
                    required={true}
                    type="text"
                    placeholder="A short description of your problem"
                    maxLength={50}
                />

                <Input
                    value={longDes}
                    onChange={(e) => setLongDes(e.target.value)}
                    required={true}
                    type="text"
                    placeholder="A more detailed description of your problem"
                />

                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}
