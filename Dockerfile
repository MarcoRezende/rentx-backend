# baixa imagem node
FROM node

# diretório dentro da imagem/container no qual
# nossa aplicação rodará
WORKDIR /usr/app

# copia todos package.json da posta raiz (rentalsx)
# para WORKDIR (/usr/app)
COPY package.json ./

# como nem todas as imagens possuem
# yarn, é mais seguro usar o npm
RUN npm install

# copia todos os arquivos da posta raiz (rentalsx)
# para WORKDIR (/usr/app)
COPY . .

# expõe a porta 3333
EXPOSE 3333

# roda o comando npm run dev
CMD ["npm", "run", "dev"] 

# rode este arquivo com "docker build -t rentx ." (olha o ponto)

# o comando "docker run -p 3333:3333 rentx" cria
# e roda o container.
# 
# 3333:3333 mapeia a porta da nossa maquina 
# (localhost:3333) para a porta 3333 do conainer docker 

# * o ponto significa diretório atual
# além disso definimos o nome da imagem