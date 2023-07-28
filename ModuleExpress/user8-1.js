function User(id, name, mail){
    this.id = id;
    this.name = name;
    this.mail = mail;
}

User.prototype.getUser = function(){
    return {id:this.id, name:this.name};
}
User.prototype.group = {id:'group1', name:"친구"};

User.prototype.printUser = function(){
    console.log('user이름 %s, group 이름 : %s', this.name, this.group.name);
}

User.prototype.printUsermailadd = function(){
    console.log('user이름 %s, group 이름 : %s, user 메일 : %s', this.name, this.group.name, this.group.mail);
}

module.exports = new User('test01', '소녀시대', "kbih1705@naver.com");