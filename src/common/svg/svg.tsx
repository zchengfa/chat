import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

let CUSTOM_SIZE = '16'
export function SET_ICON_SIZE(size:string | number){
    CUSTOM_SIZE = size.toString()
}

/**
 * 自定义icon组件所需的svg代码(静音svg)
 */
const BellIconSvg = ()=>{
    return <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"  width={CUSTOM_SIZE} height={CUSTOM_SIZE} color="#fff">
        <path
            d="M351.573333 408.96a192 192 0 0 1 192-192h13.013334a184.533333 184.533333 0 0 1 85.333333 27.093333L672.213333 213.333333a228.053333 228.053333 0 0 0-109.013333-38.4V149.333333a21.333333 21.333333 0 0 0-21.333333-21.333333 21.333333 21.333333 0 0 0-21.333334 21.333333v26.026667a232.746667 232.746667 0 0 0-136.533333 62.08 235.946667 235.946667 0 0 0-74.453333 170.666667v168.106666l42.666666-42.666666zM841.6 686.08l-59.733333-98.56a22.826667 22.826667 0 0 1-2.986667-11.093333v-160a247.253333 247.253333 0 0 0-23.466667-104.96l-32.426666 32.64a207.146667 207.146667 0 0 1 13.013333 72.32V576a62.506667 62.506667 0 0 0 9.386667 33.066667l59.733333 98.773333H358.826667l-42.666667 42.666667h488.96a42.666667 42.666667 0 0 0 36.48-64zM543.786667 853.333333a64 64 0 0 1-64-64h-42.666667a106.666667 106.666667 0 0 0 213.333333 0h-42.666666a64 64 0 0 1-64 64z"
            fill="#b7b3b3" ></path>
        <path
            d="M168.280999 777.659439m13.4256-13.425601l576.546585-576.546585q13.425601-13.425601 26.851202 0l3.318688 3.318688q13.425601 13.425601 0 26.851201l-576.546585 576.546586q-13.425601 13.425601-26.851202 0l-3.318688-3.318688q-13.425601-13.425601 0-26.851202Z"
            fill="#b7b3b3" ></path>
    </svg>
}
/**
 * 自定义icon组件(静音组件)
 */
export const BellIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={BellIconSvg} {...props}></Icon>
}

/**
 *表情svg
 */
const EmojiIconSvg = ()=> {
    return <svg  className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" width={CUSTOM_SIZE} height={CUSTOM_SIZE}>
        <path
            d="M249.6 367.2c0 36 29.6 65.6 65.6 65.6s65.6-29.6 65.6-65.6-29.6-65.6-65.6-65.6-65.6 29.6-65.6 65.6zM512 790.4c214.4 0 259.2-194.4 259.2-194.4H252.8S297.6 790.4 512 790.4z"
            fill="#2c2c2c" ></path>
        <path
            d="M512 1010.4c-274.4 0-497.6-224-497.6-498.4S237.6 14.4 512 14.4s498.4 223.2 498.4 498.4-224 497.6-498.4 497.6zM512 68C267.2 68 68 267.2 68 512s199.2 444 444 444 444-199.2 444-444S756.8 68 512 68z"
            fill="#2c2c2c" ></path>
        <path
            d="M643.2 367.2c0 36 29.6 65.6 65.6 65.6 36 0 65.6-29.6 65.6-65.6s-29.6-65.6-65.6-65.6c-36 0-65.6 29.6-65.6 65.6z"
            fill="#2c2c2c" ></path>
    </svg>
}
/**
 * 表情Icon组件
 * @param props
 * @constructor
 */
export const EmojiIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={EmojiIconSvg} {...props}></Icon>
}

/**
 * 文件svg
 */
const FileIconSvg = ()=>{
    return <svg  className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"   width={CUSTOM_SIZE} height={CUSTOM_SIZE}>
        <path
            d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-608c0-35.296-28.704-64-64-64z m-800-64h209.056l68.448 128H912v97.984c-0.416 0-0.8-0.128-1.216-0.128H113.248c-0.416 0-0.8 0.128-1.248 0.128V144z m0 736v-96l1.248-350.144 798.752 1.216V784h0.064v96H112z"
            fill="#020202" ></path>
    </svg>
}

/**
 * 文件Icon组件
 * @param props
 * @constructor
 */
export const FileIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={FileIconSvg} {...props}></Icon>
}

/**
 * 剪刀svg
 */

const ScissorsIconSvg = ()=>{
    return <svg  className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"   width={CUSTOM_SIZE} height={CUSTOM_SIZE}>
        <path
            d="M580.6 640.7c-3.4 0.3-6.4 2.4-7.9 5.4-1.6 3-1.5 6.6 0.2 9.6l101.9 176.5c6.8 11.7 18.9 18.6 32.1 18.6 2 0 4.1-0.2 6.2-0.5 15.3-2.5 27.2-13.9 30.3-29.1 7.4-36.2 1.3-73.7-17.2-105.6-29.6-51.2-86.7-80.6-145.6-74.9z m143.1 176.5c-2.2 10.6-11.2 12.9-13.9 13.3-5.7 0.9-13.4-0.8-17.7-8.4L598.5 660c45.3 1.2 87.4 25.8 110.3 65.5 16 27.7 21.3 60.3 14.9 91.7z"
            fill="" ></path>
        <path
            d="M776.7 686.4c-20.1-34.7-49.4-62.8-84.9-81.2-32.6-16.9-69-25-105.6-23.4L573.7 560l196.4-340.2c12.9-22.4 16.4-48.5 9.7-73.5-6.7-25-22.7-45.9-45.1-58.8-4.8-2.8-10.9-1.1-13.7 3.7l-209 362-209-362c-1.3-2.3-3.5-4-6.1-4.7-2.6-0.7-5.3-0.3-7.6 1-29.9 17.3-48.4 49.4-48.4 84 0 16.9 4.5 33.6 13 48.4L450.3 560l-12.5 21.7c-36.6-1.6-73 6.5-105.6 23.4-35.5 18.4-64.8 46.5-84.9 81.2-38 65.7-37.3 147.1 1.6 212.4 13.7 23 37.8 36.6 64.5 36.6h0.6c27-0.2 51.2-14.3 64.7-37.7L512 666.9l133.2 230.8c13.5 23.4 37.7 37.5 64.7 37.7h0.6c26.7 0 50.8-13.7 64.5-36.6 39-65.3 39.7-146.7 1.7-212.4z m-43.7-576c30.2 23.1 39.3 65.7 19.8 99.4L549.4 562.1c0-0.7 0.1-1.4 0.1-2.1 0-20.7-16.8-37.5-37.5-37.5-7.6 0-14.6 2.3-20.5 6.1L733 110.4zM529.5 560c0 9.6-7.8 17.5-17.5 17.5-9.6 0-17.5-7.8-17.5-17.5 0-9.6 7.8-17.5 17.5-17.5 9.6 0.1 17.5 7.9 17.5 17.5zM271.2 209.9c-6.8-11.7-10.3-25-10.3-38.4 0-24 11.3-46.6 30.1-61.1l209.4 362.7-38.6 66.9-190.6-330.1z m90.2 677.8c-9.9 17.2-27.7 27.5-47.5 27.7-19.8 0.1-37.7-9.9-47.8-26.9-35.2-59-35.8-132.6-1.5-192.1 36.1-62.5 106-99.5 178-94.3 3.8 0.3 7.5-1.7 9.4-5l22.6-39.1c0 0.7-0.1 1.4-0.1 2.1 0 20.7 16.8 37.5 37.5 37.5 7.6 0 14.6-2.3 20.5-6.1L361.4 887.7z m396.5 0.8c-10.1 17-28 27-47.8 26.9-19.8-0.1-37.6-10.5-47.5-27.7l-139-240.8 38.6-66.9 9.9 17.1c1.9 3.3 5.6 5.2 9.4 5 72-5.2 141.9 31.8 178 94.3 34.2 59.4 33.6 133-1.6 192.1z"
            fill="" ></path>
        <path
            d="M443.4 640.7c-58.9-5.7-116 23.7-145.6 74.9-18.4 31.9-24.5 69.4-17.2 105.6 3.1 15.2 15 26.6 30.3 29.1 2.1 0.3 4.1 0.5 6.2 0.5 13.2 0 25.4-6.9 32.1-18.6l101.9-176.5c1.7-2.9 1.8-6.6 0.2-9.6-1.5-3.1-4.5-5.1-7.9-5.4zM331.9 822.1c-4.4 7.6-12 9.3-17.7 8.4-2.7-0.4-11.8-2.7-13.9-13.3-6.4-31.4-1.1-63.9 14.9-91.6 22.9-39.7 65.1-64.3 110.3-65.5l-93.6 162z"
            fill="" ></path>
    </svg>
}

/**
 * 剪刀Icon组件
 * @param props
 * @constructor
 */
export const ScissorsIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={ScissorsIconSvg} {...props}></Icon>
}

/**
 * 消息记录svg
 */
const MessageIconSvg = ()=>{
    return <svg  className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"   width={CUSTOM_SIZE} height={CUSTOM_SIZE}>
        <path
            d="M512 113.923656c-217.031988 0-393.589147 176.557158-393.589147 393.589147 0 98.647741 36.297694 192.232163 102.441137 264.860297l-41.996486 88.303138c-6.801916 14.304797-6.333242 28.109198 1.303692 37.868469 5.89936 7.554046 15.123442 11.530614 26.15366 11.530614 3.291976 0 6.751774-0.334621 10.327206-1.069355l157.656693-31.885198c0.451278-0.100284 0.886183-0.200568 1.336438-0.300852 43.583634 16.143679 89.423659 24.298406 136.365784 24.298406 217.015615 0 393.589147-176.573531 393.589147-393.605519S729.015615 113.923656 512 113.923656zM512 866.893846c-44.652989 0-88.220251-8.088212-129.48098-24.064069l-8.890484-1.604544-163.789367 34.225499c-0.033769 0-0.083911 0.033769-0.116657 0.033769 0.016373-0.033769 0.033769-0.066515 0.050142-0.100284l52.106752-109.594047-8.255011-8.523117c-65.12423-67.346851-100.988042-156.01838-100.988042-249.753227 0-198.147896 161.215752-359.363647 359.363647-359.363647 198.165292 0 359.363647 161.215752 359.363647 359.363647S710.164269 866.893846 512 866.893846z"
            fill="#020202" ></path>
        <path d="M306.649052 507.516896m-34.225499 0a33.446 33.446 0 1 0 68.450998 0 33.446 33.446 0 1 0-68.450998 0Z"
              fill="#020202" ></path>
        <path d="M512 507.516896m-34.225499 0a33.446 33.446 0 1 0 68.450998 0 33.446 33.446 0 1 0-68.450998 0Z"
              fill="#020202" ></path>
        <path d="M717.350948 507.516896m-34.225499 0a33.446 33.446 0 1 0 68.450998 0 33.446 33.446 0 1 0-68.450998 0Z"
              fill="#020202" ></path>
    </svg>
}

/**
 * 消息记录Icon组件
 * @param props
 * @constructor
 */
export const MessageIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={MessageIconSvg} {...props}></Icon>
}

/**
 * 摄像头svg
 * @constructor
 */
const CameraIconSvg = ()=>{
    return <svg  className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"   width={CUSTOM_SIZE} height={CUSTOM_SIZE}>
        <path
            d="M907.712 642.592L905.088 340 700.832 485.056l206.88 157.536z m-39.68-354.784a64 64 0 0 1 101.056 51.648l2.624 302.592a64 64 0 0 1-102.752 51.456L662.048 535.968a64 64 0 0 1 1.728-103.104l204.256-145.056z"
            ></path>
        <path
            d="M144 256a32 32 0 0 0-32 32v417.376a32 32 0 0 0 32 32h456.32a32 32 0 0 0 32-32V288a32 32 0 0 0-32-32H144z m0-64h456.32a96 96 0 0 1 96 96v417.376a96 96 0 0 1-96 96H144a96 96 0 0 1-96-96V288a96 96 0 0 1 96-96z"
            ></path>
    </svg>
}

/**
 * 摄像头Icon组件
 * @param props
 * @constructor
 */
export const CameraIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon {...props} component={CameraIconSvg}></Icon>
}

/**
 * 电话svg
 */
const TelephoneIconSvg = ()=>{
    return <svg  className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg"   width={CUSTOM_SIZE} height={CUSTOM_SIZE}>
        <path
            d="M647.786667 845.397333c-76.053333-24.234667-157.248-76.266667-240.917334-163.648-81.152-84.757333-131.626667-164.864-157.504-238.442666-16.832-47.829333-21.056-85.546667-18.581333-111.402667a50.986667 50.986667 0 0 1 0.384-3.221333l0.341333-3.349334c0.469333-18.112 10.922667-46.144 22.122667-59.264a414.677333 414.677333 0 0 1 34.56-39.466666c9.834667-9.877333 19.306667-18.133333 27.946667-24.192 12.885333-9.045333 21.162667-11.328 23.317333-10.069334-0.213333 0.021333 1.045333 1.322667 2.837333 3.776 3.157333 4.288 7.082667 10.517333 11.669334 18.410667a1030.4 1030.4 0 0 1 31.04 59.264 3473.109333 3473.109333 0 0 1 58.368 126.229333c1.706667 3.84 0.938667 12.309333-1.344 15.722667l-47.04 69.824a27.52 27.52 0 0 0-3.370667 7.424c-7.509333 25.92 12.309333 66.517333 73.834667 129.216 37.504 38.186667 70.293333 63.061333 98.496 77.077333 18.944 9.429333 33.28 12.8 42.730666 12.586667 4.48-0.192 8.256-1.450667 11.52-3.626667l69.546667-46.933333c3.584-2.410667 12.416-3.349333 16.533333-1.685333l8.704 3.477333a3178.794667 3178.794667 0 0 1 91.477334 38.464c7.04 3.114667 13.802667 6.144 20.266666 9.088 21.76 9.962667 39.637333 18.773333 52.629334 25.984 6.784 3.797333 12.074667 7.061333 15.573333 9.642667 1.429333 1.066667 2.432 1.877333 2.901333 2.346666a10.602667 10.602667 0 0 1-2.197333-3.968l1.472 3.2c4.522667 8.064-16.853333 38.122667-51.562667 68.714667a626.624 626.624 0 0 1-20.544 17.344 21.333333 21.333333 0 1 0 26.453334 33.450667 669.056 669.056 0 0 0 22.293333-18.794667c52.48-46.293333 80.661333-85.866667 60.544-121.642667l1.472 3.2c-6.037333-16.64-32.277333-31.274667-91.306667-58.261333-6.613333-3.050667-13.546667-6.144-20.736-9.322667a2876.629333 2876.629333 0 0 0-101.610666-42.538666c-17.109333-6.912-40.874667-4.416-56.234667 5.930666l-69.546667 46.933334 10.922667-3.626667c0.576-0.021333-0.554667-0.149333-2.986667-0.725333a92.693333 92.693333 0 0 1-19.306666-7.424c-23.68-11.776-52.693333-33.792-87.04-68.778667-51.797333-52.757333-65.322667-80.490667-63.317334-87.445333a16.021333 16.021333 0 0 1-1.92 4.074666l46.741334-69.376c10.474667-15.573333 12.586667-39.530667 5.013333-56.725333l-4.138667-9.365333a3937.258667 3937.258667 0 0 0-46.122666-100.202667c-3.029333-6.293333-5.973333-12.416-8.874667-18.304-30.997333-63.082667-48.512-93.290667-64.213333-100.48-18.922667-11.157333-42.261333-4.672-67.456 12.992-10.922667 7.658667-22.186667 17.472-33.642667 28.970667a456.597333 456.597333 0 0 0-37.610667 42.88c-16.853333 19.712-30.805333 57.173333-31.509333 84.906666l0.341333-3.349333c-0.277333 1.493333-0.597333 3.797333-0.896 6.954667-3.050667 31.893333 1.877333 75.818667 20.821334 129.621333 27.946667 79.466667 81.664 164.736 166.912 253.781333 88.490667 92.416 175.765333 148.330667 258.773333 174.805334 27.797333 8.853333 53.888 13.952 77.973333 15.957333a21.333333 21.333333 0 0 0 3.52-42.517333 310.570667 310.570667 0 0 1-68.522666-14.08z"
            fill="#3D3D3D" ></path>
    </svg>
}

/**
 * 电话Icon组件
 * @param props
 * @constructor
 */
export const TelephoneIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={TelephoneIconSvg} {...props}></Icon>
}

/**
 * 新朋友svg
 */

const NewFriendIconSvg = ()=>{
    return <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" width="25" height="25">
        <path
            d="M762.88 937.984q-43.008 0-81.408-16.384t-67.072-45.056-45.056-67.072-16.384-81.408 16.384-81.408 45.056-66.56 67.072-44.544 81.408-16.384 81.408 16.384 66.56 44.544 44.544 66.56 16.384 81.408-16.384 81.408-44.544 67.072-66.56 45.056-81.408 16.384zM866.304 694.272l-75.776 0 0-70.656q0-14.336-9.216-24.576t-23.552-10.24-22.528 10.24-8.192 24.576l0 70.656-66.56 0q-14.336 0-24.576 10.24t-10.24 24.576 10.24 21.504 24.576 7.168l66.56 0 0 72.704q0 14.336 8.192 24.576t22.528 10.24 23.552-10.24 9.216-24.576l0-72.704 75.776 0 0 2.048q14.336 0 24.576-8.192t10.24-22.528-10.24-24.576-24.576-10.24zM613.376 439.296q-4.096 16.384-8.192 29.696-4.096 11.264-10.24 23.04t-13.312 17.92q-9.216 7.168-12.8 15.36t-6.144 16.896-5.632 17.92-10.24 18.432q-23.552 30.72-35.328 59.392t-16.384 55.296-2.56 52.736 8.192 50.688q4.096 18.432 12.288 38.4t24.064 40.96 40.448 40.96 61.44 38.4q-24.576 5.12-57.344 9.216-27.648 3.072-68.096 5.632t-92.672 2.56q-26.624 0-61.952-2.048t-72.704-5.12-73.728-7.168-66.56-8.704-51.2-9.728-26.112-9.216q-9.216-8.192-14.336-45.568t3.072-97.792q5.12-33.792 27.136-51.712t51.712-28.16 61.952-18.944 56.832-24.064q19.456-12.288 29.696-23.04t14.336-22.016 4.096-23.552-1.024-26.624q-2.048-21.504-14.848-33.792t-27.136-24.576q-8.192-6.144-14.336-18.432t-10.24-23.552q-5.12-13.312-8.192-29.696-7.168-2.048-13.312-6.144-5.12-4.096-11.264-12.288t-11.264-24.576q-5.12-15.36-3.584-28.672t5.632-22.528q4.096-11.264 11.264-19.456 0-34.816 4.096-69.632 4.096-29.696 12.8-63.488t28.16-60.416q18.432-25.6 39.424-41.984t43.52-25.6 45.056-12.8 43.008-3.584q26.624 0 51.2 6.144t45.568 16.384 37.376 23.04 26.624 26.112q23.552 29.696 34.304 65.536t15.872 67.584q5.12 36.864 4.096 73.728 6.144 5.12 10.24 12.288 4.096 6.144 6.144 16.384t0 25.6q-2.048 19.456-8.192 30.72t-13.312 17.408q-8.192 7.168-17.408 10.24z"
            fill="#ffffff"></path>
    </svg>
}

/**
 * 新朋友Icon组件
 * @param props
 * @constructor
 */
export const NewFriendIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={NewFriendIconSvg} {...props}></Icon>
}


/**
 * 新朋友svg
 */

const CommonIconSvg = ()=>{
    return <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" width="25" height="25">
        <path
            d="M682.666667 245.333333a10.666667 10.666667 0 0 0 10.666666 10.666667h189.913334c-0.913333-1.066667-1.86-2.12-2.866667-3.126667L685.793333 58.286667c-1.006667-1.006667-2.06-1.953333-3.126666-2.866667z"
            fill="#ffffff" ></path>
        <path
            d="M640 245.333333V42.666667H181.333333a53.393333 53.393333 0 0 0-53.333333 53.333333v832a53.393333 53.393333 0 0 0 53.333333 53.333333h661.333334a53.393333 53.393333 0 0 0 53.333333-53.333333V298.666667h-202.666667a53.393333 53.393333 0 0 1-53.333333-53.333334z m-320 10.666667h170.666667a21.333333 21.333333 0 0 1 0 42.666667H320a21.333333 21.333333 0 0 1 0-42.666667z m384 512H320a21.333333 21.333333 0 0 1 0-42.666667h384a21.333333 21.333333 0 0 1 0 42.666667z m21.333333-234.666667a21.333333 21.333333 0 0 1-21.333333 21.333334H320a21.333333 21.333333 0 0 1 0-42.666667h384a21.333333 21.333333 0 0 1 21.333333 21.333333z"
            fill="#ffffff"></path>
    </svg>
}

/**
 * 新朋友Icon组件
 * @param props
 * @constructor
 */
export const CommonIconComponent = (props:Partial<CustomIconComponentProps>)=>{
    return <Icon component={CommonIconSvg} {...props}></Icon>
}