import { useNavigate } from "react-router-dom";
import { TemplateDefault } from '../../TemplateDefault';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import { randomDog } from '../../hooks/randomDog';

import useStyles from './index.style';
import { isAuthenticated } from '../../services/auth';

export default function RandomDog() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [image, setImage] = useState("")

  useEffect(() => {
    const response = isAuthenticated() 

    if (response === false) {
      navigate("/")
    }
  }, [image, navigate]);


  const handleClickButton = async () => {
    const response = await randomDog()
    setImage(response.url)
  }
  return (
    <TemplateDefault>
      <main className={classes.main}>
        <div className={classes.content}>
          <Button variant="contained" color="primary" onClick={handleClickButton} style={{margin: "0 auto", maxWidth: 300}}>
            Random Dog
          </Button>
          <div style={{display: "block"}}>
            <img src={image} className={classes.img} />
          </div>
        </div>
      </main>
    </TemplateDefault>
  )
}