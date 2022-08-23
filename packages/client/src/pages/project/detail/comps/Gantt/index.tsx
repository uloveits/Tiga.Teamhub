/*
 * @Author: wangxian
 * @Date: 2022-08-20 09:46:19
 * @LastEditTime: 2022-08-23 19:24:57
 */
import GanttChart from '@/comps/Charts/GanttChart';

interface IProjectGanttProps {
  projectId: number;
}
const ProjectGantt = (props: IProjectGanttProps) => {
  const { projectId } = props;
  console.log(projectId);

  return (
    <>
      <GanttChart />
    </>
  );
};

export default ProjectGantt;
