import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/Reducers/UserReducer';
import Button from '../Button';

const RoleButton = ({ style }) => {
  // actualRole se llena con 'Mentor' por default sí el usuario al registrarse elige ser las dos cosas
  const actualRole = useSelector(state => state.user.actualRole)
  const dispatch = useDispatch()
  const url = '/api/users/profile';

  const toggleRole = () => {
    if (actualRole === 'Mentor') {
      dispatch(updateUser({ url, data: { actualRole: 'Mentee' } }));
    } else {
      dispatch(updateUser({ url, data: { actualRole: 'Mentor' } }));
    }
  }

  return actualRole ? (
    <Button
      pressFunction={toggleRole}
      title={`Soy ${actualRole}`}
      style={style}
    />
  ) : null;
}
    

export default RoleButton