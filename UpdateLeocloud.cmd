kubectl delete -n student-a-saydam deployment race_management
kubectl delete -n student-a-saydam service race_management-svc
kubectl delete -n student-a-saydam ingress race_management-ingress
kubectl delete -n student-a-saydam pod -l app=race_management
kubectl create -f leocloud-deploy-V2.yaml