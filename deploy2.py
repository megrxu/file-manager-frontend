
from subprocess import call

call(['npm', 'run', 'build'])
# call(['rsync', '-avzhe', 'ssh', 'dist/index.html',
#       'ray@megrxu.cf:/home/ray/nas'])
# call(['rsync', '-avzhe', 'ssh', 'dist/static',
#       'ray@megrxu.cf:/home/ray/nas'])

call(['rsync', '-avzhe', 'ssh', 'dist/index.html',
      'ray@megrxu.cf:/home/ray/html/file-manager'])
call(['rsync', '-avzhe', 'ssh', 'dist/static',
      'ray@megrxu.cf:/home/ray/html/file-manager'])
