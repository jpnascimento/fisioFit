create table item (
	id int not null auto_increment,
	nome varchar(100) not null,
	codigo varchar(100),
	preco float not null,
	descricao text,
	data_cadastro timestamp default now(),
	imagem varchar(255),
	primary key(id)
);

create table pedido (
	id int not null auto_increment,
	data_pedido timestamp default now(),
	total float,
	forma_pagamento_id int not null,
	primary key(id),
	foreign key(forma_pagamento_id) references forma_pagamento(id)
);

create table item_pedido (
	item_id int not null,
	pedido_id int not null,
	primary key(item_id, pedido_id),
	foreign key(item_id) references item(id),
	foreign key(pedido_id) references pedido(id)
);

create table estoque (
	id int not null auto_increment,
	item_id int not null,
	quantidade int not null,
	primary key(id),
	foreign key(item_id) references item(id)
);

create table forma_pagamento (
	id int not null auto_increment,
	nome varchar(100) not null,
	permite_parcelar boolean default false,
	quantidade_parcelas int,
	desconto float default 0.0,
	juros float default 0.0,
	descricao text,
	primary key(id)
);
