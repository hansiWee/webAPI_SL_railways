const { checkTrainStatus } = require('../../services/trainDetails/trainStatusService');

exports.getTrainStatus = async (req, res) => {
    const { train_no } = req.params;

    try {
        const status = await checkTrainStatus(train_no);
        res.status(200).json({ status });
    } catch (error) {
        console.error('Error checking train status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};