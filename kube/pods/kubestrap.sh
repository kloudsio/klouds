kubectl create -f cassandra-service.yml
kubectl create -f cassandra.yml

until [[ `kubectl get pods cassandra | grep -Eo '([0-9]+)/\1'` ]]; do
  sleep 1;
done

kubectl get endpoints cassandra -o yaml
