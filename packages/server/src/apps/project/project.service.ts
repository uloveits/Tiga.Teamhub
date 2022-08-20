import { UpdateProjectMemberDto } from './dto/update-project-member.dto';
/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-20 08:38:16
 */
import { Project } from './entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectUser } from './entities/project_user.entity';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;

  @InjectRepository(ProjectUser)
  private readonly projectUserRepository: Repository<ProjectUser>;

  async create(body: CreateProjectDto, user: any) {
    const res: any = await this.repository.save(body);

    if (res.id) {
      // 添加项目用户关联表
      const projectUser: ProjectUser = new ProjectUser();
      projectUser.user_id = user.userId;
      projectUser.project_id = res.id;
      projectUser.isManaged = true;
      this.projectUserRepository.save(projectUser);
    }

    return res;
  }

  async findAll(user: any) {
    console.log(user);
    // 获取当前用户项目列表
    const findMyProjectSql = `select P.id, P.name, P.des,P.color, P.create_time, P.update_time
                                from project_user PU
                                left join project P 
                                on PU.project_id = P.id
                                where P."isDeleted" = false and PU.user_id = ${user.userId}`;
    const allProject = await this.repository.query(findMyProjectSql);

    // 循环找到项目的成员信息
    for (let i = 0; i < allProject.length; i++) {
      const findProjectUserSql = `select U.id, U.account, U.username, U.color, PU."isManaged" 
                                    from project_user PU 
                                    left join "user" U on PU.user_id = U.id 
                                    where U."isDeleted" = false and PU.project_id = ${allProject[i].id}`;
      const projectUser = await this.repository.query(findProjectUserSql);
      allProject[i].users = projectUser;
    }
    return allProject;
  }

  async updateMember(body: UpdateProjectMemberDto) {
    // 先删除所有成员信息
    await this.projectUserRepository
      .createQueryBuilder()
      .delete()
      .from(ProjectUser)
      .where('project_id = :id', { id: body.projectId })
      .execute();

    // 批量添加用户信息
    for (let i = 0; i < body.userIds.length; i++) {
      // 添加项目用户关联表
      const projectUser: ProjectUser = new ProjectUser();
      projectUser.user_id = body.userIds[i].id;
      projectUser.project_id = body.projectId;
      projectUser.isManaged = body.userIds[i].isManaged;
      this.projectUserRepository.save(projectUser);
    }

    return true;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
