
from subprocess import call

call(['npm', 'run', 'build'])
# call(['rsync', '-avzhe', 'ssh', 'dist/index.html',
#       'ray@megrxu.cf:/home/ray/nas'])
# call(['rsync', '-avzhe', 'ssh', 'dist/static',
#       'ray@megrxu.cf:/home/ray/nas'])

call(['rsync', '-avzhe', 'ssh', 'dist/index.html',
      'root@10.76.8.185:/var/www/html/nas'])
call(['rsync', '-avzhe', 'ssh', 'dist/static',
      'root@10.76.8.185:/var/www/html/nas'])
