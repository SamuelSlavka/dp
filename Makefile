# for me only :)
stop:
	systemctl stop apache2.service

# build all the stuff
init: 
	USER=$(id -u) GROUP=$(id -g)
	docker-compose build
	python3 ./Server/main.py compile

# start dev enviroment
dev:
	docker-compose -f docker-compose-blockchainless.yml up --remove-orphans

# compile and setup zokrates
compile:
	python3 ./Server/main.py compile

# create doge proof
dogeproof:
	python3 ./Server/main.py dogeproof

# create btc proof
btcproof:
	python3 ./Server/main.py btcproof

# create bch proof
bchproof:
	python3 ./Server/main.py bchproof

# interact with smart contract
btcinteract:
	python3 ./Server/main.py btcinteract

# interact with smart contract
dogeinteract:
	python3 ./Server/main.py dogeinteract

# interact with smart contract
bchinteract:
	python3 ./Server/main.py bchinteract

# deploy smart contracts
deploy:
	python3 ./Server/main.py deploy

# call contract method default btc
call:
	python3 ./Server/main.py call