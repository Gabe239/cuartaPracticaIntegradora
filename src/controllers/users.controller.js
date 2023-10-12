import userModel from '../dao/models/userModel.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const changeUserRoleToPremium = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if the user exists
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is upgrading to premium
        if (user.role !== 'premium') {
            return res.status(400).json({ message: 'The user must upgrade to premium to perform this action' });
        }

        // Check if the user has uploaded the required documents
        const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];

        if (!user.documents || user.documents.length < 3) {
            return res.status(400).json({ message: 'The user must upload at least 3 documents to become premium' });
        }

        // Check if the required documents are uploaded
        const uploadedDocumentNames = user.documents.map((doc) => doc.name);

        for (const doc of requiredDocuments) {
            if (!uploadedDocumentNames.includes(doc)) {
                return res.status(400).json({ message: `The user must upload ${doc} to become premium` });
            }
        }

        // User is eligible for an upgrade to premium
        return res.status(200).json({
            message: 'User role changed to premium',
            documentNames: uploadedDocumentNames,
            documentCount: user.documents.length,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const uploadFiles = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await userModel.findById(uid);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Process the uploaded files and update the user's status
        if (req.files) {
            const documents = req.files.map((file) => ({
                name: file.originalname,
                reference: file.path // You can store the file path in the database
            }));

            user.documents = documents;
            await user.save();
        }

        return res.status(200).json({ message: 'Files uploaded successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};