import { useEffect, useState, useContext } from 'react';
import { DownOutlined, PlusOutlined ,CloseOutlined } from '@ant-design/icons';
import { UnitContext } from 'context/UnitContext';
import { Button } from 'antd';
import UserService from 'services/UserService';
import WAutoComplete from '../WAutoComplete';
import DialogBox from './';

interface UnitCrewDialogProps {
    unitData : any,
    isOpen : boolean,
    setIsOpen : Function,
    form? : any | null,
    handleClose : Function,
}

const UnitCrewDialog : React.FC <UnitCrewDialogProps> = ({
    unitData,
    isOpen,
    setIsOpen,
    form,
    handleClose,
} ) => {
    const {accessToken} = useContext(UnitContext)
    const [teamLeadData, setTeamLeadData] = useState<any>({});
    const [teamMemberData, setTeamMemberData] = useState<any[]>([]);
    const userService = new UserService(accessToken)
    const { v4: uuidv4 } = require('uuid');
    const addCrewMember = () => {
        setTeamMemberData((prev:any) => [...prev, {
            'user_name' : '',
            '_index' : uuidv4()
        }])
    }

    const removeCrewMember = (index:any) => {
        setTeamMemberData((prev:any) => prev.filter((_ : any, i:number) => i !== index))
        /*setTeamMemberData((prev:any) => {
            const newMembers = [...prev];
            newMembers.splice(index, 1)
            return newMembers;
        });*/
    }

    const updateCrewMember = (crew: any, index: number) => {
        setTeamMemberData((prev:any) => 
            prev.map((member:any, i:number) => 
                i === index ? { ...member, user_name: crew.label } : member
            )
        );
    }

    const saveCrewMembers = () => {
        console.log(teamMemberData)
    }

    useEffect(() => {
        if (isOpen) {
            //
        }
    },[isOpen])
    return (<>
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle={`UNIT CREW`}
            form={form}
            handleClose={handleClose}
            onSave={saveCrewMembers}
        >
            <div id="crew-modal-container">
                <div id="cm-title" style={{fontSize:'20px', fontWeight:'bold'}}>
                    Setup crew for unit - {unitData?.model_name}
                </div>
                <div id="cm-plate-no">Plate No: {unitData?.plate_number}</div>
                <div id="crew-modal-body" style={{marginTop: '1%'}}>
                    <div id="cm-team-lead">
                        Team Lead:
                        <WAutoComplete 
                            service={userService}
                            functionName={'getUser'}
                            data={teamLeadData}
                            setData={setTeamLeadData}
                            payload={{
                                payload : {users_name : ''},
                                page: 1,
                            }}
                            wAutoCompleteIndexPayload={'users_name'}
                            style={{width:'100%'}}
                        />
                    </div>
                    <div id="cm-team-members">
                        <div id="add-new-cm">
                            <Button type="primary" onClick={addCrewMember}>
                                <PlusOutlined />
                                Add New Crew Member
                            </Button>
                        </div>
                        <div id="cm-crew-members-container">
                            {teamMemberData.map((crew:any, index:number) => {
                                return (<>
                                    <div style={{float:'left', width:'90%'}}>
                                        <WAutoComplete 
                                            key={crew._index}
                                            service={userService}
                                            functionName={'getUser'}
                                            data={crew.user_name}
                                            setData={(crew:any) => updateCrewMember(crew, index)}
                                            payload={{
                                                payload : {users_name : ''},
                                                page: 1,
                                            }}
                                            wAutoCompleteIndexPayload={'users_name'}
                                            style={{width:'100%'}}
                                        />
                                    </div>
                                    <div style={{float:'right'}}>
                                        <Button type="default" onClick={()=>removeCrewMember(index)}>
                                            <CloseOutlined />
                                        </Button>
                                    </div>
                                    <div style={{clear:'both'}}>

                                    </div>
                                </>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </DialogBox>
    </>)
}

export default UnitCrewDialog;