
import {BsGithub} from 'react-icons/bs';
import {SiGrafana} from 'react-icons/si';

function Logos() {

    return  (
        <div className='flex flex-row my-auto mx-4'>

<div className='flex flex-col mx-2'>
   <BsGithub className="text-white mx-auto" size={36} />
   <div className='text-sm'>SourceCode </div>
   </div>

   <div className='flex flex-col mx-2'>
   <SiGrafana className='text-white mx-auto' size={36} />
    <div className='text-sm'>Methrics </div>
   </div>
   </div>
    )
}

export default Logos;