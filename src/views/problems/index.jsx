import React, { memo, useEffect, useState } from 'react'
import { ProblemsWrapper } from './styled'
import { useParams } from 'react-router-dom'
import ProblemContainer from './c-cpns/problem-cotainer'
import CodeArea from './c-cpns/codeArea'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchProblemAction } from '../../store/modules/problem'
import { codeSubmit } from '../../services/modules/submit'
import MdEditor from '../../components/mdEditor'

const Problems = memo(() => {

  const [tabSelect, setTabSelect] = useState(0)

  const {problemInfo,codeTemplate,codeLang} = useSelector((state)=>(
    {
    problemInfo:state.problem.problemInfo,
    codeTemplate:state.problem.codeTemplate,
    codeLang:state.problem.codeLang
    }
  ),shallowEqual)

  const tabClickHandler = (index) => {
    setTabSelect(index)
  }

  const {pid} = useParams()

  const [showResult,setShowResult] = useState(false)

  const submitHandler = (lang,code) => {
    codeSubmit(pid,lang,code)
    setShowResult(true)
    setTabSelect(3)
  }

  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(fetchProblemAction(pid))
  // },[dispatch,pid])

  const [useMd,setUseMd] = useState(false) 

  const modeChangeHandler = () => {
    setUseMd(!useMd)
  }

  return (
    <ProblemsWrapper>
      <div className="problems">
        <ProblemContainer 
          tabSelect={tabSelect} 
          tabClickHandler={tabClickHandler} 
          problemInfo={problemInfo} 
          codeTemplate={codeTemplate} 
          codeLang={codeLang} 
          showResult={showResult} 
          useMd={useMd}
          modeChangeHandler={modeChangeHandler}
        />
        <div className="middle-area"></div>
       { useMd ?
        <MdEditor
          mode='solution'
          btnText=''
          cancelHandler={modeChangeHandler}
        />
        :
        <CodeArea
          submitHandler={submitHandler} 
          codeTemplate={codeTemplate} 
          codeLang={codeLang} 
        />
        }
      </div>
    </ProblemsWrapper>
  )
})

export default Problems