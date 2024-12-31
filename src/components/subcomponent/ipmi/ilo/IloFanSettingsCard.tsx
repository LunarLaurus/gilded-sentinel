import React, { useState } from 'react';
import axios from 'axios';
import ToastNotification from '../../../message/toast/ToastNotification';
import callEndpointNoArguments from '../../../../hooks/useEndpointNoArguments';
import { API_URL } from '../../../../App';
import { IPv4Address } from '../../../../types/IpmiInterfaces';
import '../../../../styles/ilo/IloFanSettingsCard.css';
import { AuthenticatedClient, IloRestFanObject } from '../../../../types/IloInterfaces';

interface IloFanSettingsCardProps {
    ip: IPv4Address;
    iloUuid: string;
}

const IloFanSettingsCard: React.FC<IloFanSettingsCardProps> = ({ ip, iloUuid }) => {
    const MAX_FAN_SPEED = 100;
    const MIN_FAN_SPEED = 1;
    const SAFE_DEFAULT_FAN_SPEED = 30;
    const [fanSpeedSettings, setFanSpeedSettings] = useState({
        selectedOption: 'SAFE' as 'MIN' | 'SAFE' | 'MAX' | 'CUSTOM',
        customFanSpeed: 20,
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toggleMinMaxState, setToggleState] = useState<boolean>(false);
    const { data: authenticatedClient, loading: loadingAuthenticated } = callEndpointNoArguments<AuthenticatedClient>(`ilo/${iloUuid}/authenticated`);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    if (loadingAuthenticated || !authenticatedClient) {
        return <div>Loading client...</div>;
    }

    const updateFanSpeeds = async (fanSpeed: number) => {
        setLoadingUpdate(true);
        try {
            const type = toggleMinMaxState === false ? 'MIN' : 'MAX';
            setToastMessage('Attempting to update all ' + type + ' fans to ' + fanSpeed + '%');
            const { status } = await axios.post(`${API_URL}/ilo/updateFanSpeeds`, {
                iloClientAddress: ip.address,
                updateType: type,
                targetFanSpeed: fanSpeed,
            });
            setToastMessage(
                status === 200 ? 'Fan speeds updated successfully!' : 'Failed to update fan speeds.'
            );
        } catch (error) {
            console.error('Error updating fan speeds:', error);
            setToastMessage('Error updating fan speeds.');
        }
        setLoadingUpdate(false);
    };

    const handleDropdownChange = (value: 'MIN' | 'SAFE' | 'MAX' | 'CUSTOM') => {
        setFanSpeedSettings((prev) => ({ ...prev, selectedOption: value }));
    };

    const handleCustomFanSpeedChange = (value: number) => {
        setFanSpeedSettings((prev) => ({
            ...prev,
            customFanSpeed: Math.max(MIN_FAN_SPEED, Math.min(MAX_FAN_SPEED, value)),
        }));
    };

    const handleUpdateClick = () => {
        var newFanSpeed = SAFE_DEFAULT_FAN_SPEED;
        if (fanSpeedSettings.selectedOption === 'CUSTOM') {
            newFanSpeed = fanSpeedSettings.customFanSpeed;
        }
        else if (fanSpeedSettings.selectedOption === 'MIN') {
            newFanSpeed = MIN_FAN_SPEED;
        }
        else if (fanSpeedSettings.selectedOption === 'MAX') {
            newFanSpeed = MAX_FAN_SPEED;
        }
        else {
            newFanSpeed = SAFE_DEFAULT_FAN_SPEED;
        }
        updateFanSpeeds(newFanSpeed);
    };

    const getFanDataString = (fan: IloRestFanObject) => {
        return 'Fan ' + fan.slotId + ': ' + fan.currentReading + (fan.unit.toLowerCase() === 'percent' ? '%' : 'RPM') + ' [' + fan.statusState + ' / ' + fan.statusHealth + ']';
    }

    return (
        <div className="fan-settings-card">
            <h3>{authenticatedClient.iloUuid}</h3>
            <h4>{authenticatedClient.iloAddress.address}</h4>
            <p style={{ textAlign: 'center' }}>
                {authenticatedClient.fans.map((fan, index) => (
                    <React.Fragment key={index}>
                        <span>{getFanDataString(fan)}
                            <br /></span>
                    </React.Fragment>
                ))}
            </p>
            <h4>Update Configuration</h4>
            <select
                id="fan-speed-select"
                className="fan-settings-dropdown"
                value={fanSpeedSettings.selectedOption}
                onChange={(e) =>
                    handleDropdownChange(e.target.value as 'MIN' | 'SAFE' | 'MAX' | 'CUSTOM')
                }
            >
                <option value="MIN">Min ({MIN_FAN_SPEED}%)</option>
                <option value="SAFE">Safe ({SAFE_DEFAULT_FAN_SPEED}%)</option>
                <option value="MAX">Max ({MAX_FAN_SPEED}%)</option>
                <option value="CUSTOM">User</option>
            </select>
            <button
                className="fan-settings-btn"
                onClick={() =>
                    toggleMinMaxState === false ? setToggleState(true) : setToggleState(false)
                }
            >
                {toggleMinMaxState === false ? 'MIN' : 'MAX'}
            </button>

            <br />
            <input
                id="custom-fan-speed"
                className="fan-settings-number-field"
                type="number"
                value={fanSpeedSettings.customFanSpeed}
                onChange={(e) =>
                    fanSpeedSettings.selectedOption === 'CUSTOM'
                        ? handleCustomFanSpeedChange(parseInt(e.target.value) || MIN_FAN_SPEED)
                        : null
                }
                min={MIN_FAN_SPEED}
                max={MAX_FAN_SPEED}
                disabled={fanSpeedSettings.selectedOption !== 'CUSTOM'}
            />
            {loadingUpdate && (
                <div className="fan-settings-spinner">
                    <div className="fan-settings-spinner-circle"></div>
                    <span></span>
                </div>
            )}

            {!loadingUpdate && <button onClick={handleUpdateClick} className="fan-settings-btn">
                Update
            </button>}
            {toastMessage && (
                <ToastNotification
                    message={toastMessage}
                    onClose={() => setToastMessage(null)}
                />
            )}
        </div>
    );
};

export default IloFanSettingsCard;
