import useLang from '@hooks/useLang';
import React, { FormEvent, useState } from 'react';
import axiosInstance from 'services/instance';
import Label from '../atoms/Lable';
import InputField from '../atoms/InputField';
import { authLabel } from '@data/localization/common/auth';
import Button from '../atoms/Button';
import { postLabel } from '@data/localization/common/landingPage/sharePost';

interface FormData {
    title: string;
    content: string;
    files: FileList | null;
}

interface AddPostProps {
    onPostAdded: () => void;
}


const AddPost: React.FC<AddPostProps> = ({ onPostAdded }) => {
    const { lang } = useLang();
    const initialFormData: FormData = {
        title: '',
        content: '',
        files: null,
    };
    
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            files: e.target.files,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('type', 'POST');
        if (formData.files) {
            for (let i = 0; i < formData.files.length; i++) {
                data.append('files', formData.files[i]);
            }
        }
        try {
            const response = await axiosInstance.post('/notes/', data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            if (onPostAdded) {
                onPostAdded();  // Trigger the refresh
            }
            // Reset formData to initial state after successful post
            setFormData(initialFormData);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='mt-6'>
                    <div className='ml-3'>
                        <Label name={'title'} label={postLabel.title[lang]} required={true} />
                    </div>
                    <InputField name={'title'} type={'title'} placeholder={postLabel.enterTitle[lang]} onChange={handleChange} value={formData.title} />
                </div>
                <div>
                    <div className='ml-3 mt-2'>
                        <Label name={'content'} label={postLabel.content[lang]} required={true} />
                    </div>
                    <InputField name={'content'} type={'content'} placeholder={postLabel.enterContent[lang]} onChange={handleChange} value={formData.content} />
                </div>
                <div>
                    <div className='ml-3 mt-2'>
                        <Label name={'files'} label={authLabel.uploadFiles[lang]} required={true} />
                    </div>
                    <InputField name={'files'} type={'file'} multiple onChange={handleFileChange} />
                </div>
                <div className='mt-9 ml-0'>
                    <Button type={'submit'} buttonText={postLabel.share[lang]} />
                </div>
            </form>
        </div>
    );
};

export default AddPost;
