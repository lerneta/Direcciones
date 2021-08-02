import * as FileSystem from 'expo-file-system';
import { insertAdress } from '../db'
export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: Path,
            });

            const result = await insertAdress(
                title,
                Path,
                'Adress',
                13.4,
                10.5
            )

            console.log(result);
            dispatch({ type: ADD_PLACE, payload: { id: result.insertId,  title, image: Path } });


        } catch (err) {
            console.log(err.mesage);
            throw err;
        }

    
     
    }
}