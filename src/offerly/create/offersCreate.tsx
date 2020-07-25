import * as React from 'react';
import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    required,
    email,
    SelectInput,
    RadioButtonGroupInput,
    NumberInput,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    password: { display: 'inline-block' },
    confirm_password: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

export const validatePasswords = ({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}) => {
    const errors = {} as any;

    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = [
            'resources.customers.errors.password_mismatch',
        ];
    }

    return errors;
};

const OffersCreate = (props: any) => {
    const classes = useStyles();

    return (
        <Create {...props}>
            <SimpleForm validate={validatePasswords}>
                <SectionTitle label="Create Offer" />
                <TextInput
                    autoFocus
                    source="Offer Group"
                    formClassName={classes.TextInput}
                    validate={requiredValidate}
                    style={{ display: 'inline', float: 'left', marginLeft: '20px' }}
                />
                <SelectInput source="Offer type" choices={[
                    { id: 'discount', name: 'Discount' },
                    { id: 'comboOffer', name: 'Combo Offer' },
                    { id: 'buy2Get3', name: 'Buy x and Get Y (Buy 2 Get 3)' },
                    { id: 'buy2Getypercent', name: 'Buy x and Get Y% Off (Buy 2 & Get 30% Off)' },
                    { id: 'buy2GetXRs.Off', name: 'Buy x and Get Rs. 300 Off' },
                    { id: 'billXAndGetYPercent.Off', name: 'Bill x and Y% Off (Bill Rs.1000 & Get 10% off)' },
                    { id: 'billXAndGetYRs.Off', name: 'Buy x and Get Rs.Y Off (Bill Rs.1000 & Get Rs.100 off)' },
                    { id: 'cashback', name: 'Cashback' },
                    { id: 'product', name: 'Product' },
                ]} validate={requiredValidate} />
                <RadioButtonGroupInput source="Offer In" choices={[
                    { id: 'percentage', name: 'Percentage' },
                    { id: 'cash', name: 'Cash' },
                ]} validate={requiredValidate} style={{ display: 'inline', float: 'left', marginLeft: '20px' }}/>
                <RadioButtonGroupInput source="Amount Type" choices={[
                    { id: 'flat', name: 'Flat' },
                    { id: 'upto', name: 'Upto' },
                ]} validate={requiredValidate} />

                <NumberInput source="Maximum Offer" style={{ marginLeft: '20px' }}/>

                <TextInput
                    source="Offer Title"
                    formClassName={classes.zipcode}
                    helperText={false}
                    validate={requiredValidate}
                    style={{ marginLeft: '20px' }}
                />
                <Separator />
                <DateInput source="Start Date" validate={requiredValidate} style={{ display: 'inline', float: 'left', marginLeft: '20px'}}/>
                <DateInput source="End Date" validate={requiredValidate} />

                <TextInput
                    source="About Offer"
                    formClassName={classes.TextInput}
                    helperText={false}
                    multiline
                    fullWidth
                    validate={requiredValidate}
                    style={{ marginLeft: '20px' }}
                />

                {/* <TextInput
                    source="Password"
                    formClassName={classes.password}
                    validate={requiredValidate}
                />
                <Separator />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth
                    formClassName={classes.email}
                    validate={[required(), email()]}
                />
                <DateInput source="birthday" />
                <Separator />
                <SectionTitle label="resources.customers.fieldGroups.address" />
                <TextInput
                    source="address"
                    formClassName={classes.address}
                    multiline
                    fullWidth
                    helperText={false}
                />
                <TextInput
                    source="zipcode"
                    formClassName={classes.zipcode}
                    helperText={false}
                />
                <TextInput
                    source="city"
                    formClassName={classes.city}
                    helperText={false}
                />
                <Separator />
                <SectionTitle label="resources.customers.fieldGroups.password" />
                <PasswordInput
                    source="password"
                    formClassName={classes.password}
                />
                <PasswordInput
                    source="confirm_password"
                    formClassName={classes.confirm_password}
                /> */}
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }: { label: string }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default OffersCreate;
