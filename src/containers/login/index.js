import React from "react";
import Cookies from "js-cookie";
import {
  FormControl,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Link
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { apiLogin } from '../../api/login'
import "./index.scss";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: "100%",
    height: 60
  },
  container: {
    flexWrap: "wrap",
    textAlign: "center",
    margin: "0 auto"
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    minWidth: 270
  }
}));

export default withRouter(function Login(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    username: "",
    loginErroMsg: ""
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (values) => {
    apiLogin({
      username: values.username,
      password: values.password
    }).then(res => {
      if (res.err) {
        setValues({ ...values, loginErroMsg: "账号或密码错误" });
        return;
      }
      Cookies.set("token", res.token);
      Cookies.set("userInfo", JSON.stringify(res.userInfo));
      props.globalStore.userInfo = res.userInfo;
      props.history.push('/playground')
    });
  };

  return (
    <div className="login">
      <div className="login-content">
        <FormControl>
          <TextField
            label="账号"
            placeholder="请输入账号"
            onChange={handleChange("username")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            autoComplete="auto"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="密码"
            placeholder="请输入密码"
            autoComplete="auto"
            type={values.showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            helperText={values.loginErroMsg}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            登录
          </Button>
          <div className="link">
            <div style={{ textAlign: "right" }}>
              <Link component="button" variant="body2" to="/signUp">
                注册
              </Link>
            </div>
          </div>
        </FormControl>
      </div>
    </div>
  );
});
