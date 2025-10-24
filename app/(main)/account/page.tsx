import {
    BentoContainer,
    BentoContainerHeader,
} from "@/components/reusables/bento-container";
import { Title, Description, SubTitle } from "@/components/reusables/texts";
import AccountField from "@/components/account/account-field";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AccountPage = async () => {
    const account = {
        parnterId: "123456",
        username: "John Doe",
        email: "johndoe@school.edu.ph",
    };

    return (
        <BentoContainer className="space-y-8 bg-background ">
            <BentoContainerHeader>
                <Title> Account </Title>
                <Description>
                    Manage your account settings and preferences here.
                </Description>
            </BentoContainerHeader>

            <section> 
                <SubTitle className="mb-4"> Profile Information </SubTitle>
                <div className="space-y-4">
                    {Object.entries(account).map(([key, value]) => (
                        <AccountField
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={value}
                        />
                    ))}
                </div>
            </section>

            {/* ACCOUNT CONTROLS  */}
            <section>
                <SubTitle className="mb-4"> Account Controls </SubTitle>
                <Button variant={'destructive'}>
                    <LogOut />
                    Log Out 
                </Button>
            </section>
        </BentoContainer>
    );
};

export default AccountPage;
