import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../redux/actions/authActions';

const MenuSwitcher = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (role === 'user' || role === 'admin') {
      dispatch(setRole(role)); 
      navigate(`/recruit/${role === 'user' ? 'employeeDashboard' : 'dashboard'}`);
    } else {
      navigate('/recruit/'); 
    }
  }, [role, dispatch, navigate]);

  return null; 
};

export default MenuSwitcher;
