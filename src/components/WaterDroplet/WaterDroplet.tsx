import './waterDroplet.sass'
import { Form,Input,Button } from "antd";

function WaterDroplet(props:any){

    return <div className={'drop-container'}>
        {
            props.type === 'form' ? <div className={'drop'} style={{minHeight:'400px',boxShadow:props.dropBoxShadow,width:props.width,height:props.height,backgroundColor:props.waterDropletColor}}>
                <p className={'form-title'} style={{fontSize:props.fontSize}}>{props.title ? props.title : 'title'}</p>
                <Form className={'form'}>
                    <Form.Item className="form-item">
                        <span className={'form-input-span'}></span>
                        <Input className={'account form-input'} placeholder={'Username'}></Input>
                    </Form.Item>
                    <Form.Item className="form-item password">
                        <span className={'form-input-span'}></span>
                        <Input className={'password form-input'} placeholder={'Password'}></Input>
                    </Form.Item>
                    <Form.Item className={'form-item'}>
                        <Button className={'form-input form-btn'}>LOGIN</Button>
                    </Form.Item>
                </Form>
            </div>: <div className={'drop'} style={{left:'0',top:'0',boxShadow:props.dropBoxShadow,width:props.width,height:props.height,borderRadius:props.radius,backgroundColor:props.waterDropletColor}}>
                <span className={'form-title'} style={{position:'relative',top:'0%',maxWidth:'50%',textAlign:'center',fontSize:props.fontSize}}>{props.title ? props.title : 'title'}</span>
            </div>
        }
    </div>
}

export default WaterDroplet