import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { AuthenticatedClient, IloBios } from '../../../../types/IloInterfaces';
import InfoTable from '../../../../components/primary/table/InfoTable';
import InfoGrid from '../../../../components/primary/table/InfoGrid';

interface Props {
    client: AuthenticatedClient;
}

const ClientGrid: React.FC<{ client: AuthenticatedClient; }> = ({ client }) => {

    React.useEffect(() => {
        document.title = client.serverHostname;
    }, [client.serverHostname]);

    return (
        <div>
            <InfoTable
                data={client}
                fieldsToDisplay={['iloUuid', 'iloText', 'iloVersion', 'healthStatus', 'indicatorLed']}
                title={client.serverHostname}
                defaultVisible={true}
                showArrow={false}
                clickable={false}
            />
            <InfoTable
                data={client.oemInformation.hostOS}
                fieldsToDisplay={['osName', 'osSysDescription', 'osVersion', 'osType']}
                title={"Host Information"}
                defaultVisible={true}
                showArrow={false}
                clickable={false}
            />
            <InfoTable
                data={client.oemInformation}
                fieldsToDisplay={[
                    'powerRegulatorMode',
                    'powerRegulatorModesSupported',
                    'trustedModules',
                    'intelligentProvisioningIndex',
                    'intelligentProvisioningLocation',
                    'intelligentProvisioningVersion',
                    'postState',
                    'powerAllocationLimit',
                    'powerAutoOn',
                    'powerOnDelay',
                    'virtualProfile'
                ]}
                title={"OEM Information"}
                defaultVisible={false}
            />
            <InfoTable
                data={client.iloBootInformation}
                fieldsToDisplay={[
                    'bootSourceOverrideEnabled',
                    'bootSourceOverrideSupported',
                    'bootSourceOverrideTarget',
                    'uefiTargetBootSourceOverride',
                    'uefiTargetBootSourceOverrideSupported'
                ]}
                title={"Boot Information"}
                defaultVisible={false}
            />
        </div>
    );
}

const BiosGrid: React.FC<{ bios: IloBios; }> = ({ bios }) => {
    const validBootBlock = (bios.bootBlock?.version?.length > 0) && ('N/A' !== bios.bootBlock?.version);
    bios.current.allocation = "Current";
    bios.backup.allocation = "Backup";
    if (validBootBlock) {
        bios.bootBlock.allocation = "Boot Block";
    }
    const sections = [
        {
            title: '',
            clickable: false,
            fieldsToDisplay: ['version', 'family', 'date'],
        },
    ];
    return (
        <InfoGrid
            data={validBootBlock
                ? [bios.current, bios.backup, bios.bootBlock]
                : [bios.current, bios.backup]}
            title="BIOS Information"
            clickable={true}
            defaultVisible={false}
            sections={sections}
            noDataMessage="No clients available."
            getItemTitle={(bios) => bios.allocation || 'Unknown'}
        />
    );
}

const ClientDetails: React.FC<Props> = ({ client }) => {

    return (
        <div className="generic-ilo-container">

            <div className='generic-ilo-card'>
                <ClientGrid client={client} />
                <InfoTable data={client.cpuData} fieldsToDisplay={['count', 'model', 'status']} title={'Processor Details'} defaultVisible={false} />
                <BiosGrid bios={client.oemInformation.bios} />
                <InfoTable data={client.iloLicense} fieldsToDisplay={['license', 'licenseKey', 'licenseType']} title={'License Details'} defaultVisible={false} />
            </div>

        </div>
    );
}
export default ClientDetails;
