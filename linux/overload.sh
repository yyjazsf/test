# 少量 cpu 占用
cat /dev/urandom | gzip -9 > /dev/null
# cpu 占用高
cat /dev/urandom | gzip -9 | gzip -d | gzip -9 | gzip -d > /dev/null

# 内存占用
mkdir z
mount -t ramfs ramfs z/
# write 128 1M file
dd if=/dev/zero of=z/file bs=1M count=128

# disk IO
dd if=/dev/zero of=loadfile bs=1M count=1024

while true; do cp loadfile loadfile1; done

for i in {1…10}; do cp -f loadfile loadfile1; done
