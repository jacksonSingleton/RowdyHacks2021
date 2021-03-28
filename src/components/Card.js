import React from "react";
import {
    CardWrapper,
    CardHeader,
    CardHeading,
    CardBody,
    CardIcon,
    CardFieldset,
    CardInput,
    CardOptionsItem,
    CardOptions,
    CardOptionsNote,
    CardButton,
    CardLink
} from "../styles/card-style";

const Card = () => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardHeading>Wingardium Leviosa</CardHeading>
            </CardHeader>

            <CardBody>
                <CardFieldset>
                    <CardInput placeholder="Username" type="text" required />
                </CardFieldset>

            </CardBody>
        </CardWrapper>
    );
}
export default Card;
