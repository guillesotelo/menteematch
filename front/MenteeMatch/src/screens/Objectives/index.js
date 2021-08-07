import React, { useEffect, useState } from 'react';
import ObjectivesComponent from '../../components/ObjectivesComponent';
import {
  getObjectivesFromUser,
  postObjectivesToUser,
  deleteObjectivesToUser,
  updateObjectivesToUser,
  sendNotification,
} from '../../services/axiosServices';
import { useSelector } from 'react-redux';
import { simpleMessage } from '../../utils';

const Objectives = ({ route }) => {
  const mentee = route.params.mente;
  const { userToken } = useSelector(state => state.auth);

  const [data, setdata] = useState([]);
  const [state, setstate] = useState(false); // ver como hacer el re render de una forma no tan hardcodeada

  useEffect(() => {
    const init = async () => {
      const res = await getObjectivesFromUser(mentee._id, userToken);
      setdata(res.data);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleAdd = async objective => {
    const res = await postObjectivesToUser(mentee._id, userToken, objective);
    if (res) {
      simpleMessage(
        'Objetivo agregado',
        'El objetivo fue agregado correctamente',
        'success',
      );
      sendNotification(
        {
          receptor: mentee._id,
          type: 'objective',
        },
        userToken,
      )
      setstate(!state);
    }
  };

  const handleDelete = async objetiveId => {
    const res = await deleteObjectivesToUser(mentee._id, userToken, objetiveId);
    if (res) {
      setstate(!state);
    }
  };

  const handleEdit = async (objectiveId, dataInside) => {
    const res = await updateObjectivesToUser(
      userToken,
      objectiveId,
      dataInside,
    );
    if (res) {
      simpleMessage(
        'Objetivo editado',
        'El objetivo fue editado correctamente',
        'success',
      );
      setstate(!state);
    }
  };

  return (
    <ObjectivesComponent
      data={data}
      handleAdd={handleAdd}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      mentee={mentee}
    />
  );
};

export default Objectives;
