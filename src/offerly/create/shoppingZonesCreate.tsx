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

const ShoppingZonesCreate = (props: any) => {
    const classes = useStyles();

    return (
        <Create {...props}>
            <SimpleForm validate={validatePasswords}>
                <SectionTitle label="Create Offer" />
                
                <TextInput
                    source="Area/Zone"
                    formClassName={classes.TextInput}
                    validate={requiredValidate}
                />
                <TextInput
                    source="Longitude"
                    formClassName={classes.TextInput}
                    validate={requiredValidate}
                />
                <TextInput
                    source="Latitude"
                    formClassName={classes.TextInput}
                    validate={requiredValidate}
                />
                <TextInput
                    source="City"
                    formClassName={classes.TextInput}
                    validate={requiredValidate}
                />
                <TextInput
                    source="State"
                    formClassName={classes.TextInput}
                    validate={requiredValidate}
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

export default ShoppingZonesCreate;
