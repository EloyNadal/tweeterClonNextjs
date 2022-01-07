import { db } from "services/firebase/admin";

export default function handler(req, res) {

    const { query } = req;
    const { id } = query;
    const devitRef = db.collection('devists');

    devitRef.doc(id).get().then((doc) => {
        const data = doc.data();
        
        if (data) {

            const id = doc.id;
            const { createdAt } = data;

            res.json({
                ...data,
                id,
                createdAt: +createdAt.toDate()
            })
            //res.status(200).json(data);
        }

        res.status(404).end();

    }).catch(err => {
        res.status(500).json(err);
    });

}