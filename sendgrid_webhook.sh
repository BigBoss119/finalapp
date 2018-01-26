function localtunnel {
  lt -s vkvj2342s23423423fhhqw324234jn4234234424vxj234234rohj --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done