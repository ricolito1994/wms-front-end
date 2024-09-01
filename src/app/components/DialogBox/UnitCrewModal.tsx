import { useEffect, useState, useContext } from 'react';
import { DownOutlined, PlusOutlined ,CloseOutlined } from '@ant-design/icons';
import { UnitContext } from 'context/UnitContext';
import { Button, Checkbox } from 'antd';
import UserService from 'services/UserService';
import { UnitService } from 'services/UnitService';
import WAutoComplete from '../WAutoComplete';
import DialogBox from './';

interface UnitCrewDialogProps {
    unitData : any,
    isOpen : boolean,
    setIsOpen : Function,
    form? : any | null,
    crewdata? : any | null,
    leaddata? : any | null,
    handleClose : Function,
}

const UnitCrewDialog : React.FC <UnitCrewDialogProps> = ({
    unitData,
    isOpen,
    setIsOpen,
    form,
    crewdata,
    leaddata,
    handleClose,
} ) => {
    const {accessToken} = useContext(UnitContext)
    const [teamLeadData, setTeamLeadData] = useState<any>({});
    const [teamMemberData, setTeamMemberData] = useState<any[]>([]);
    const userService = new UserService(accessToken);
    const unitService = new UnitService(accessToken);
    const { v4: uuidv4 } = require('uuid');

    const addCrewMember = (crew:any|null = null) => {
        setTeamMemberData((prev:any) => [...prev, {
            'user_name' : crew ? crew.users_name : '',
            'user_id' : crew ? crew.user_id : '',
            is_driver : crew ? crew.is_driver : false,
            is_team_lead : crew ? crew.is_team_lead : false,
            //'_index' : crew ? crew._index : uuidv4()
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
                i === index ? { ...member, user_name: crew.label, user_id: crew.value } : member
            )
        );
    }

    const saveCrewMembers = async () => {
        try {
            const teamLead = {
                user_id : teamLeadData.user_id,
                unit_id : unitData.id,
                is_driver : teamLeadData.is_driver,
                is_team_leader: true
            }
            let teamMememberDataToDB = teamMemberData.map ( (m: any, i: number) => {
                return {
                    unit_id : unitData.id,
                    user_id : m.user_id,
                    is_driver : m.is_driver ? m.is_driver : false,
                    is_team_leader: m.is_team_leader ? m.is_team_leader : false,
                }
            } )
            teamMememberDataToDB =  [...teamMememberDataToDB, teamLead];
            let crewDatas = {
                crew : teamMememberDataToDB
            }
            let newCrewData = await unitService.saveCrew(crewDatas, unitData?.id)
            onCloseThisModal({
                crew : newCrewData.data,
                unitId : unitData.id,
            });
        } catch (e) {

        }
    }

    const onCloseThisModal = (e: any) => {
        setTeamLeadData({});
        setTeamMemberData([]);
        handleClose(e)
    }

    useEffect(() => {
        if (isOpen) {
            //
            if(leaddata) {
                setTeamLeadData({
                    user_name : leaddata.users_name,
                    user_id : leaddata.user_id,
                    is_driver : leaddata.is_driver,
                    is_team_lead : leaddata.is_team_leader,
                })
            }
            if(crewdata) {
                for (let i in crewdata) {
                    if(crewdata[i]) addCrewMember(crewdata[i])
                }
            }
            
        } 
        return () => {
        }
    },[isOpen])

    return (<>
        <DialogBox
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle={`UNIT CREW`}
            form={form}
            handleClose={onCloseThisModal}
            onSave={saveCrewMembers}
        >
            <div id="crew-modal-container">
                <div id="cm-title" style={{fontSize:'20px', fontWeight:'bold'}}>
                    Setup crew for unit - {unitData?.model_name}
                </div>
                <div id="cm-plate-no">Plate No: {unitData?.plate_number}</div>
                <div id="crew-modal-body" style={{marginTop: '1%'}}>
                    <div id="cm-team-lead">
                        {isOpen ? (
                            <>
                                <WAutoComplete 
                                    key={uuidv4()}
                                    service={userService}
                                    functionName={'getUser'}
                                    data={teamLeadData.user_name}
                                    setData={(crew:any) => setTeamLeadData((prev:any) => (
                                        {...prev, user_id: crew.value, user_name: crew.label }
                                    ))}
                                    payload={{
                                        payload : {
                                            users_name : '',
                                        },
                                        page: 1,
                                    }}
                                    wAutoCompleteIndexPayload={'users_name'}
                                    wAutoCompleteIndexRsLabel={'fullname'}
                                    style={{width:'100%'}}
                                />
                                <Checkbox checked={teamLeadData.is_driver} onChange={()=>
                                    setTeamLeadData((prev:any) => ({...prev, is_driver : !teamLeadData.is_driver}))
                                }>
                                    Set as Driver
                                </Checkbox>
                            </>)
                    : ''}
                    </div>
                    <div id="cm-team-members">
                        <div id="add-new-cm">
                            <Button type="primary" onClick={addCrewMember}>
                                <PlusOutlined />
                                Add New Crew Member
                            </Button>
                        </div>
                        <div id="cm-crew-members-container">
                            {teamMemberData.map((crew:any, index:number) => 
                                (<>
                                    <div style={{float:'left', width:'20%'}}>
                                        <Checkbox checked={crew.is_driver} onChange={()=>{
                                            crew.is_driver = !crew.is_driver
                                            crew.value = crew.user_id
                                            crew.label = crew.user_name
                                            updateCrewMember(crew, index)
                                        }}>
                                            is driver
                                        </Checkbox>
                                    </div>
                                    <div style={{float:'left', width:'70%'}}>
                                        <WAutoComplete 
                                            key={uuidv4()}
                                            service={userService}
                                            functionName={'getUser'}
                                            data={crew.user_name}
                                            setData={(crew:any) => updateCrewMember(crew, index)}
                                            payload={{
                                                payload : {
                                                    users_name : '',
                                                },
                                                page: 1,
                                            }}
                                            wAutoCompleteIndexPayload={'users_name'}
                                            wAutoCompleteIndexRsLabel={'fullname'}
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DialogBox>
    </>)
}
export default UnitCrewDialog;