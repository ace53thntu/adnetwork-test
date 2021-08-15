import React from 'react';
import {Button} from 'reactstrap';
import {useNavigate} from 'react-router-dom';

export default function TableCreateButton({link = '', text = ''}) {
  const navigate = useNavigate();
  return (
    <Button
      color="primary"
      className="btn-pill btn-shadow"
      size="sm"
      onClick={() => navigate(link)}
    >
      {text}
    </Button>
  );
}
