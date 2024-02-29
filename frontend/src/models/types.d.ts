interface ITask {
    id : number;
    title : string;
    status : 'active' | 'done';
    description: string;
    createdAt: string;
    projectId?: number;
    project?: IProject;
    users: [
        {
            userId: number,
            taskId: number,
            user: IUser
        }
    ];
    inputValue:string
}

interface IUser {
    id : number;
    admin: boolean;
    firstname : string;
    lastname : string;
    email : string;
    createdAt: string;
    tasks : [
        {
            userId: number,
            taskId: number,
            task : ITask
        }
    ];
    projects : [
        {
            userId:number,
            projectId: number,
            project: IProject
        }
    ];
}


interface IProject {
    relatedUsersId: any;
    id : number;
    title : string;
    description: string;
    createdAt: string;
    tasks : [
        {
            taskId : number,
            projectId : number,
            task : ITask
        }
    ];
    users: [
        {
            userId: number,
            projectId: number,
            user: IUser
            
        }
    ];
}

interface IUserTaskTime {
    id: number,
    userId : number,
    taskId: number,
    time: string,
    date: string
    createdAt: any
}