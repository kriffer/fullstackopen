
import StatisticLine from '../StatisticLine'

const Statistics = (props) => {

    const getAll = () => {

        return props.good + props.neutral + props.bad;
    }


    const getAvg = () => {
        let sum = props.arr.reduce(function (a, b) {
            return a + b;
        }, 0);

        return (sum / props.arr.length).toFixed(2);
    }

    const getPositivePercentage = () => {
        return ((props.good * 100) / (props.good + props.neutral + props.bad)).toFixed(2) + " %";
    }

    return (
        <div>


            <table>
                <tbody>
                    <StatisticLine text="good" value={props.good} />
                    <StatisticLine text="neutral" value={props.neutral} />
                    <StatisticLine text="bad" value={props.bad} />
                    <StatisticLine text="all" value={getAll()} />
                    <StatisticLine text="average" value={getAvg()} />
                    <StatisticLine text="positive" value={getPositivePercentage()} />
                </tbody>

            </table>

        </div>
    )
}

export default Statistics