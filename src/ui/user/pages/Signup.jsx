import {authLabel} from '@data/localization/common/auth'
import useLang from '@hooks/useLang'
import Button from '@ui/common/atoms/Button'
import InputField from '@ui/common/atoms/InputField'
import Label from '@ui/common/atoms/Lable'
import {Link,useNavigate} from 'react-router-dom'
import React from 'react'
const Signup= ()=>{
const {lang} = useLang();
const navigate =useNavigate();
const goBack = ()=>{
    navigate('/');
}
return(
    <div>
        <form>
            <Button type={'button'} buttonText={authLabel.goBack[lang]} onClick={goBack} />
            <h1> {authLabel.userSignup[lang]}</h1>
        </form>
        <div>
            <Label name={'first_name'} label={authLabel.firstName[lang]}required={true}/>
            <inputField name={'first_name'}type={'text'} placeholder={authLabel.enterYourFirstName[lang]} />
        </div>
    </div>
)
}
export default Signup