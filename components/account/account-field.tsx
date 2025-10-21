import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface AccountFieldProps {
    label : string;
    value : string;
}
const AccountField : React.FC<AccountFieldProps> = ({
    label,
    value
}) => {
    return (
        <div>
            <Label className="mb-2">{label}</Label>
            <Input readOnly value={value} />
        </div>
    )
};

export default AccountField;