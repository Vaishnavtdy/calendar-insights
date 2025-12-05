import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../redux/slices/calendarSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DataModal.css';

export default function DataModal() {
    const dispatch = useDispatch();
    const { showModal, selectedDate, calendarData } = useSelector((state) => state.calendar);

    if (!showModal) return null;

    const data = selectedDate ? calendarData[selectedDate] : null;

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleBackdropClick = (e) => {
        if (e.target.className === 'modal-backdrop') {
            handleClose();
        }
    };

    const chartData = data
        ? data.map((item) => {
            const [user, value] = Object.entries(item)[0];
            return { user, value };
        })
        : [];

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Data for {selectedDate}</h2>
                    <button className="close-btn" onClick={handleClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    {data && data.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="user" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="no-data-message">
                            <p>⚠️ No data found for the selected date: {selectedDate}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
