import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const PhoneNumberInput = (props) => {

    return (
        <div className='w-full'>
            <PhoneInput
                country={'tn'} // Set Tunisia as the default country
                value={props.value}
                countryCodeEditable={false}
                copyNumbersOnly={true}
                onChange={phone => props.onChange(phone)}
                onEnterKeyPress={props.save}
                inputStyle={{
                    height: '40px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #767676',
                    paddingLeft: '45px'
                }}
                buttonStyle={{
                    border: 'none',
                    backgroundColor: 'transparent'
                }}
                dropdownStyle={{
                    width: '190px',
                    height :'120px'
                }}
            />
        </div>
    );
};

export default PhoneNumberInput;
