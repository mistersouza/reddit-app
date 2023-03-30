import React, { useState } from 'react'

const useFile = () => {
    const [ file, setFile ] = useState<string | undefined>(undefined);
    
    const handleFileChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files?.[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(target.files?.[0]);

            reader.onload = () => {
                if (reader.result) {
                    console.log(reader.result);
                setFile(reader.result as string);
                }
            }
        }
    }

    return { file, handleFileChange, setFile }; 
}

export default useFile