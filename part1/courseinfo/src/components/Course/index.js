
import Header from "../Header";
import Content from "../Content";


const Course = (props) => {

  const getTotal = () => {
    const sum = props.course.parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
    return sum;
  }

  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <h3><b>total of {getTotal()} exercises</b></h3>
    </div>
  )
}

export default Course; 