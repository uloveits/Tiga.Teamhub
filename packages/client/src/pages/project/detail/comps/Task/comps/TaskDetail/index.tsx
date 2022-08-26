/*
 * @Author: wangxian
 * @Date: 2022-08-25 10:55:30
 * @LastEditTime: 2022-08-25 18:18:20
 */

import ProjectApi from '@/api/ProjectApi';
import { Avatar, Button, Divider, Empty, Progress, Tag } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import React from 'react';
import { Split } from 'ronds-react-ui';
import SubTaskList from './SubTaskList';
import AddSubTask from './AddSubTask';
import AddTaskDes from './AddTaskDes';

interface ITaskDetailProps {
  id: number;
  // onClose?: () => void;
}
const TaskDetail = (props: ITaskDetailProps) => {
  const { id } = props;

  const [info, setInfo] = React.useState<any>({});
  const [subTask, setSubTask] = React.useState<any[]>([]);

  const [isAddModal, setIsAddModal] = React.useState<boolean>(false);
  const [isDesModal, setIsDesModal] = React.useState<boolean>(false);

  const getTaskDetail = React.useCallback(async () => {
    const res = await Promise.all([ProjectApi.getProjectTaskInfo(id), ProjectApi.getSubtTaskList(id)]);
    const [infoRes, subListRes] = res;
    if (infoRes.successed) {
      console.log('getTaskDetail', infoRes);
      setInfo({ ...infoRes.data });
    }
    if (subListRes.successed) {
      setSubTask([...subListRes.data]);
    }
  }, [id]);

  React.useEffect(() => {
    if (id) {
      getTaskDetail();
    }
  }, [getTaskDetail, id]);

  return (
    <>
      <Split direction="horizontal" gutterSize={5} minSize={0} onDragEnd={() => {}} sizes={[80, 20]}>
        <div className="p-2 bg-white">
          <div className="flex">
            <div className="flex-1">
              任务 <span className="text-red-700">#{id}</span> 由 <span className="text-purple-600"> {info.creator} </span>于
              <span className="text-gray-600"> {moment(info.create_time).format('YYYY-MM-DD')} </span> 创建
            </div>
            <div style={{ width: '120px' }}>
              <Progress percent={info.completeRate} size="small" status="active" />
            </div>
          </div>
          <Divider />
          <div>
            <div className="font-bold text-xl pb-2 flex">
              <div className="flex-1">{info.name}</div>
              <div>
                <Button
                  shape="circle"
                  size="small"
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsDesModal(true);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <div className="p-2" style={{ background: '#fff', border: '1px solid #E5E6EB' }}>
                {info?.des ? <MDEditor.Markdown source={info.des} /> : <Empty />}
              </div>
            </div>
            <div style={{ border: '1px solid #E5E6EB' }}>
              <div className="bg-green-100 p-1  flex items-center rounded">
                <div>
                  <Button
                    size="small"
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setIsAddModal(true);
                    }}
                  />
                </div>
                <div className="pl-2 flex-1 font-bold">子任务</div>
              </div>
              <div className="p-2">
                <SubTaskList list={subTask} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 bg-gray-50">
          <div>
            <div className="font-bold text-sm pb-2">责任人</div>
            <div className="flex">
              {info.assignee &&
                info.assignee.split(',').map((user: any, idx: number) => (
                  <div className="pr-2" key={user}>
                    <Avatar className="avatar" style={{ backgroundColor: `${info.assignee_color.split(',')[idx]}`, verticalAlign: 'middle' }}>
                      {user}
                    </Avatar>
                  </div>
                ))}
            </div>
          </div>
          <Divider />
          <div>
            <div className="font-bold  text-sm pb-2">时间</div>
            <div>
              开始时间：<span className="text-red-500">{info.startTime}</span>
            </div>
            <div>
              结束时间：<span className="text-red-500">{info.endTime}</span>
            </div>
          </div>
          <Divider />
          <div>
            <div className="font-bold  text-sm pb-2">功能分类</div>
            <div>
              <Tag color="magenta">{info.classification}</Tag>
            </div>
          </div>
          <Divider />
          <div>
            <div className="font-bold  text-sm pb-2">关联需求</div>
          </div>
        </div>
      </Split>

      <AddSubTask
        info={info}
        taskId={id}
        isModal={isAddModal}
        onCancel={() => {
          setIsAddModal(false);
        }}
        onSuccess={() => {
          getTaskDetail();
          setIsAddModal(false);
        }}
      />
      <AddTaskDes
        des={info.des}
        taskId={id}
        isModal={isDesModal}
        onCancel={() => {
          setIsDesModal(false);
        }}
        onSuccess={() => {
          getTaskDetail();
          setIsDesModal(false);
        }}
      />
    </>
  );
};

export default TaskDetail;
