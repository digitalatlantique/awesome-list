export class User {

  readonly id: string;
  name: string;
  email: string;
  avatar: string;
  pomodoroDuration: number;

  constructor(options: {
    id?: string,
    name?: string,
    email?: string,
    avatar?: string,
    pomodoroDuration?: number,
  } = {}) {
    this.id = options.id || null;
    this.name = options.name || '';
    this.email = options.email || '';
    this.avatar = options.avatar || '';
    this.pomodoroDuration = options.pomodoroDuration || 1500;
  }

  get roles(): string[] {
    return this.email.endsWith('google.com') ? ['USER', 'EMPLOYEE'] : ['USER'];
  }

}
